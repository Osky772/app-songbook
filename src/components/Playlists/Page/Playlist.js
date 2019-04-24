import React, { Component, Fragment } from "react";
import {
	PageWrapper,
	SongPaper as PlaylistPaper
} from "../../containers/StyledContainers";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formatSongDescription } from "../../Songs/Page/Song";
import CreatePDF from "../../SharedComponents/CreatePDF";
import Button from "@material-ui/core/Button";
import PlaylistModal from "../Create/PlaylistModal";
import { db } from "../../../App";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const styles = theme => ({
	wrapper: {
		[theme.breakpoints.down("sm")]: {
			paddingTop: 0
		}
	},
	container: {
		width: "100%",
		padding: 15,
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			padding: 10
		}
	},
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
	summaryContainer: {
		padding: "0 15px",
		[theme.breakpoints.down("sm")]: {
			padding: "0 5px"
		}
	},
	detailsContainer: {
		display: "block",
		padding: 15,
		[theme.breakpoints.down("sm")]: {
			padding: "0 5px"
		}
	},
	title: {
		fontSize: 18
	},
	verse: {
		fontSize: 14,
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
	},
	deleteModal: {
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
		const user = this.props.user;

		db.ref(`playlists/${id}`)
			.remove()
			.then(() => {
				db.ref(`users/${user.uid}/playlists/${id}`)
					.remove()
					.then(() => {
						alert("Playlist removed");
					})
					.then(() => this.props.history.push("/playlisty"));
			})
			.catch(error => alert(error.message));
	};

	render() {
		const {
			isEditing,
			playlist,
			playlist: { title, songs = [] }
		} = this.state;
		const { classes, selectedSongs, handleSelectSongs, user } = this.props;
		const isLoggedIn = user !== null;
		const isOwnerOfPlaylist = isLoggedIn
			? user.email === playlist.userEmail
			: false;
		return (
			<PageWrapper className={classes.wrapper}>
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
				<PlaylistPaper className={classes.container}>
					<h1>{title}</h1>
					<p>Stworzone przez: {playlist.userEmail}</p>
					<div className={classes.buttonsWrapper}>
						{isOwnerOfPlaylist ? (
							<Fragment>
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
									<div className={classes.deleteModal}>
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
							</Fragment>
						) : null}

						<CreatePDF playlist title={title} songs={songs} />
					</div>
					{songs.map((song, nr) => (
						<ExpansionPanel key={song.id}>
							<ExpansionPanelSummary
								expandIcon={<ExpandMoreIcon />}
								className={classes.summaryContainer}
							>
								<Typography>
									{song.performer
										? nr + 1 + ". " + song.performer + " - " + song.title
										: nr + 1 + ". " + song.title}
								</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails
								onClick={() => console.log(nr.toString())}
								className={classes.detailsContainer}
							>
								<Typography className={classes.title}>
									{song.performer
										? song.performer + " - " + song.title
										: song.title}
								</Typography>
								{formatSongDescription(song).map((verse, i) => {
									return verse.text !== null ? (
										<Typography className={classes.verse} key={i}>
											<span className={classes.text}>{verse.text}</span>
											<span className={classes.chords}>
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
