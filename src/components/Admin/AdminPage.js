import React, { Component } from "react";
import { db } from "../../App";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import { formatSongDescription } from "../Songs/Page/Song";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { PageWrapper, ListContainer } from "../containers/StyledContainers";
import Button from "@material-ui/core/Button";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
	songsWrapper: {
		width: "80%",
		margin: "0 8px 16px 8px",
		[theme.breakpoints.down("sm")]: {
			width: "100%"
		}
	},
	verse: {
		display: "flex",
		justifyContent: "space-between",
		margin: "10px 0"
	},
	text: {
		width: "75%",
		[theme.breakpoints.down("sm")]: {
			width: "70%"
		}
	},
	chords: {
		width: "20%",
		[theme.breakpoints.down("sm")]: {
			width: "25%"
		}
	}
});

class AdminPage extends Component {
	state = {
		songs: [],
		isAdmin: false,
		user: null
	};

	componentDidMount() {
		this.getSongs();
	}

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
		db.ref(`songs/${song.id}`)
			.set({ ...song })
			.then(() => {
				alert("Song approved");
				db.ref(`songs-to-approve/${song.id}`)
					.remove()
					.then(() => alert("Song removed successfully"))
					.catch(error => alert(error.message));
			})
			.catch(error => alert(error.message));
	};

	deleteSong = id => {
		db.ref(`songs-to-approve/${id}`)
			.remove()
			.then(() => alert("Song removed successfully"))
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
								color="secondary"
								variant="outlined"
								onClick={() => this.deleteSong(song.id)}
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
										<p key={i} className={classes.verse}>
											<span className={classes.text}>{verse.text}</span>
											<span className={classes.chords}>
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
