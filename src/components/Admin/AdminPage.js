import React, { Component } from "react";
import { db } from "../../App";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { formatSongDescription, styles as songStyles } from "../Song";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PageWrapper, ListContainer } from "../containers/StyledContainers";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
	songsWrapper: {
		width: "80%",
		marginBottom: 16
	}
});

class AdminPage extends Component {
	state = {
		songs: [],
		isAdmin: false,
		user: null
	};

	getSongs = () => {
		const { user } = this.props;
		db.ref("songs-to-approve")
			.once("value")
			.then(snapshot => {
				const songs = snapshot.val() || {};
				const arraySongs = Object.keys(songs).map(key => ({
					id: key,
					...songs[key]
				}));
				this.setState({
					songs: arraySongs || [],
					isAdmin: true,
					ref: db.ref("songs"),
					user
				});
			})
			.catch(error => alert("Probably permission denied"));

		db.ref("songs-to-approve").on("value", snapshot => {
			const songs = snapshot.val() || {};
			const arraySongs = Object.keys(songs).map(key => ({
				id: key,
				...songs[key]
			}));
			this.setState({ songs: arraySongs || [] });
		});
	};

	componentWillUnmount() {
		const { user } = this.props;
		this.state.ref && this.state.ref.off();

		if (user === null) {
			this.setState({ songs: [], isAdmin: false, user: null });
			return;
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			this.getSongs();
			this.setState({ user: this.props.user });
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.user === null) {
			return {
				...state,
				user: null,
				isAdmin: false
			};
		}
		return null;
	}

	submitSong = id => {
		const { songs } = this.state;
		const song = songs.find(song => song.id === id);
		console.log(song);
		db.ref(`songs/${song.id}`)
			.set({ ...song })
			.then(() => {
				alert("Song approved");
				db.ref("songs-to-approve")
					.remove()
					.then(() => alert("Song removed successfully"))
					.catch(error => alert(error.message));
			})
			.catch(error => alert(error.message));
	};

	render() {
		const { songs = [], isAdmin } = this.state;
		const { classes } = this.props;
		return isAdmin ? (
			<PageWrapper>
				<ListContainer className={classes.songsWrapper}>
					<h1>Do zatwierdzenia</h1>
					{songs.map(song => (
						<ExpansionPanel key={song.id}>
							<Button
								color="primary"
								variant="outlined"
								onClick={() => this.submitSong(song.id)}
							>
								Zatwierdź
							</Button>
							<Button
								variant="outlined"
								onClick={() => this.submitSong(song.id)}
							>
								Edytuj
							</Button>
							<Button
								color="secondary"
								variant="outlined"
								onClick={() => this.submitSong(song.id)}
							>
								Usuń
							</Button>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>
									{song.performer
										? song.performer + " - " + song.title
										: song.title}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails style={{ display: "block" }}>
								{formatSongDescription(song).map((verse, i) => {
									return verse.text !== null ? (
										<p key={i} style={songStyles.verse}>
											<span style={songStyles.text}>{verse.text}</span>
											<span style={songStyles.chords}>
												{verse.chords ? verse.chords : null}
											</span>
										</p>
									) : (
										<br key={i} />
									);
								})}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</ListContainer>
			</PageWrapper>
		) : null;
	}
}

export default withStyles(styles)(AdminPage);
