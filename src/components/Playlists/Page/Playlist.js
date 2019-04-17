import React, { Component } from "react";
import {
	PageWrapper,
	SongPaper as PlaylistPaper
} from "../../containers/StyledContainers";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
	formatSongDescription,
	styles as songStyles
} from "../../Songs/Page/Song";
import CreatePDF from "../../SharedComponents/CreatePDF";
import Button from "@material-ui/core/Button";
import PlaylistModal from "../Create/PlaylistModal";
import { db } from "../../../App";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const styles = theme => ({
	buttonsWrapper: {
		width: "100%",
		paddingBottom: "15px"
	},
	btn: {
		marginRight: 15
	},
	yesBtn: {
		fontSize: "14px",
		textTransform: "none",
		fontWeight: "bold",
		padding: "3px 25px",
		marginRight: 15
	},
	noBtn: {
		color: "white",
		fontSize: "14px",
		textTransform: "none",
		fontWeight: "bold",
		padding: "3px 25px",
		backgroundColor: theme.palette.secondary.main,
		"&:hover": {
			backgroundColor: theme.palette.secondary.dark,
			color: "#ececec"
		}
	},
	title: {
		fontSize: 18
	},
	verse: {
		fontSize: 14
	},
	paper: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: theme.spacing.unit * 60,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing.unit * 4,
		outline: "none"
	}
});

class Playlist extends Component {
	state = {
		isEditing: false,
		playlist: {},
		open: false
	};

	getPlaylist = () => {
		const { userId, playlistId } = this.props.match.params;
		if (userId) {
			db.ref(`users/${userId}/playlists/${playlistId}`)
				.once("value")
				.then(snapshot => {
					const playlist = snapshot.val();
					this.setState({
						playlist: {
							...playlist,
							id: playlistId
						}
					});
				});
			return;
		}

		db.ref(`playlists/${playlistId}`)
			.once("value")
			.then(snapshot => {
				const playlist = snapshot.val();
				this.setState({
					playlist: {
						...playlist,
						id: playlistId
					}
				});
			});
	};

	componentDidMount() {
		this.getPlaylist();
	}

	handleEditPlaylist = () => {
		this.setState({ isEditing: true });
	};

	handleCloseEditMode = () => {
		this.setState({ isEditing: false });
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleRemovePlaylist = id => {
		const { userId, playlistId } = this.props.match.params;

		if (userId) {
			db.ref(`users/${userId}/playlists/${playlistId}`)
				.remove()
				.then(() => alert("Removed playlist successfully"))
				.then(() => this.props.history.push("/playlisty"))
				.catch(error => alert(error.message));

			return;
		}

		db.ref(`playlists/${id}`)
			.remove()
			.then(() => alert("Playlist removed"))
			.then(() => this.props.history.push("/playlisty"))
			.catch(error => alert(error.message));
	};

	render() {
		const {
			isEditing,
			playlist,
			playlist: { title, songs = [] }
		} = this.state;
		const { classes, selectedSongs, handleSelectSongs, user } = this.props;

		return (
			<PageWrapper>
				{isEditing && (
					<PlaylistModal
						isEditing={isEditing}
						editedPlaylist={playlist}
						handleClose={this.handleCloseEditMode}
						selectedSongs={selectedSongs}
						handleSelectSongs={handleSelectSongs}
						fetchData={this.getPlaylist}
						user={user}
					/>
				)}
				<PlaylistPaper>
					<h1>{title}</h1>
					<p>Stworzone przez: {playlist.userEmail}</p>
					<div className={classes.buttonsWrapper}>
						<Button
							className={classes.btn}
							onClick={() => this.handleEditPlaylist(playlist)}
						>
							Edytuj
						</Button>
						<Button className={classes.btn} onClick={this.handleOpen}>
							Usuń
						</Button>
						<Modal
							aria-labelledby="simple-modal-title"
							aria-describedby="simple-modal-description"
							open={this.state.open}
							onClose={this.handleClose}
						>
							<div className={classes.paper}>
								<Typography variant="h6">
									Czy na pewno chcesz usunąć playlistę?
								</Typography>
								<Typography variant="subtitle1">
									Pamiętaj, że po usunięciu playlisty nie ma możliwości jej
									przywrócenia.
								</Typography>
								<Button
									className={classes.yesBtn}
									onClick={() => this.handleRemovePlaylist(playlist.id)}
								>
									Tak
								</Button>
								<Button
									variant="contained"
									className={classes.noBtn}
									onClick={this.handleClose}
								>
									{" "}
									Nie
								</Button>
							</div>
						</Modal>

						<CreatePDF title={title} songs={songs} />
					</div>
					{songs.map(song => (
						<ExpansionPanel key={song.id}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>
									{song.performer
										? song.performer + " - " + song.title
										: song.title}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails style={{ display: "block" }}>
								<Typography className={classes.title}>
									{song.performer
										? song.performer + " - " + song.title
										: song.title}
								</Typography>
								{formatSongDescription(song).map((verse, i) => {
									return verse.text !== null ? (
										<Typography
											className={classes.verse}
											key={i}
											style={songStyles.verse}
										>
											<span style={songStyles.text}>{verse.text}</span>
											<span style={songStyles.chords}>
												{verse.chords ? verse.chords : null}
											</span>
										</Typography>
									) : (
										<br key={i} />
									);
								})}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</PlaylistPaper>
			</PageWrapper>
		);
	}
}

export default withStyles(styles)(Playlist);
