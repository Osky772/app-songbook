import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { ContainerModal } from "../../containers/StyledContainers";
import { DragDropContext } from "react-beautiful-dnd";
import SongsContainer from "../UI/SongsContainer";
import InfoSnackBar from "../../SharedComponents/InfoSnackBar";
import ErrorValidateInfo from "../../SharedComponents/ErrorValidateInfo";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { db } from "../../../App";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const styles = theme => ({
	wrapper: {
		zIndex: 10000
	},
	modalTitle: {
		textAlign: "center",
		fontSize: 28
	},
	modalWrapper: {
		transform: "translateZ(0)",
		backfaceVisibility: "hidden",
		perspective: "1000",
		position: "absolute",
		top: 0,
		height: "100%",
		width: "700px",
		background: "white",
		outline: "none",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
			maxWidth: "100%",
			left: 0
		}
	},
	form: {
		marginTop: 70,
		[theme.breakpoints.down("sm")]: {
			marginTop: 10
		}
	},
	formWrapper: {
		padding: "0px 25px 25px 25px",
		height: "100%",
		overflowY: "auto",
		position: "relative",
		[theme.breakpoints.down("sm")]: {
			padding: 8
		}
	}
});

class PlaylistModal extends Component {
	state = {
		isCreating: false,
		isEditing: false,
		isError: false,
		playlist: {
			id: null,
			title: "",
			isPublic: false,
			songs: []
		}
	};

	static getDerivedStateFromProps(props, state) {
		// To create new playlist
		if (
			props.isCreating &&
			props.selectedSongs !== undefined &&
			state.playlist.songs !== undefined &&
			state.playlist.songs.length === 0 &&
			props.selectedSongs.length !== 0 &&
			props.isEditing !== true &&
			state.isEditing !== true
		) {
			return {
				...state,
				isCreating: true,
				playlist: {
					...state.playlist,
					title: "",
					songs: props.selectedSongs
				}
			};
		}

		// To update playlist with selected songs
		if (
			Boolean(props.editedPlaylist.id) &&
			props.isEditing &&
			state.isEditing !== true
		) {
			const playListSongsArray =
				props.editedPlaylist.songs === undefined
					? []
					: props.editedPlaylist.songs;

			const songs = [...playListSongsArray].concat(props.selectedSongs);
			const unique = songs
				.map(e => e["id"])
				.map((e, i, final) => final.indexOf(e) === i && i)
				.filter(e => songs[e])
				.map(e => songs[e]);
			return {
				...state,
				playlist: {
					...props.editedPlaylist,
					songs: unique
				},
				isEditing: true
			};
		}
		return null;
	}

	handleChange = e => {
		this.setState({
			...this.state,
			playlist: {
				...this.state.playlist,
				title: e.target.value
			}
		});
	};

	handleSelectChange = e => {
		this.setState({
			...this.state,
			playlist: {
				...this.state.playlist,
				isPublic: Boolean(e.target.value)
			}
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		const { playlist } = this.state;
		const { user } = this.props;
		const required = Object.keys(playlist).filter(key => key !== "id");
		const emptyValues = required.filter(
			key => playlist[key] === "" || playlist[key].length === 0
		);
		const error = emptyValues.reduce(
			(acc, next) => ({
				...acc,
				[next]: true
			}),
			{}
		);
		const isError = emptyValues.length > 0;

		if (isError) {
			this.setState({
				...this.state,
				isError: true,
				error
			});
			return;
		}
		if (playlist.id && playlist.isPublic) {
			db.ref(`playlists/${playlist.id}`)
				.update(playlist)
				.then(() => {
					alert("Playlist edited successfully");
					this.props.handleSelectSongs([]);
				})
				.then(() => this.props.fetchData())
				.catch(err => {
					alert(err.message);
				});
			return;
		}
		if (playlist.id === null && playlist.isPublic) {
			const newPlaylistRef = db.ref("playlists").push();
			newPlaylistRef
				.set({
					...playlist,
					id: newPlaylistRef.key,
					userId: user.uid,
					userEmail: user.email
				})
				.then(() => {
					alert("Added playlist successfully");
					this.props.handleSelectSongs([]);
					this.props.handleClose();
				})
				.catch(err => {
					alert(err.message);
				});
			return;
		}
		if (!playlist.isPublic && !playlist.id) {
			const newPrivatePlaylistRef = db
				.ref(`users/${user.uid}/playlists`)
				.push();
			newPrivatePlaylistRef
				.set({
					...playlist,
					id: newPrivatePlaylistRef.key,
					userId: user.uid,
					userEmail: user.email
				})
				.then(() => {
					alert("Your private playlist added successfully");
					this.props.handleSelectSongs([]);
					this.props.handleClose();
				})
				.catch(err => {
					alert(err.message);
				});
			return;
		}
		if (!playlist.isPublic && playlist.id) {
			db.ref(`users/${user.uid}/playlists/${playlist.id}`)
				.update(playlist)
				.then(() => {
					alert("Playlist edited successfully");
					this.props.handleSelectSongs([]);
				})
				.then(() => this.props.fetchData())
				.catch(err => {
					alert(err.message);
				});
			return;
		}
	};

	handleClose = () => {
		const { handleClose } = this.props;
		this.setState({ open: false, isEditing: false, editedPlaylist: "" });

		handleClose();
	};

	onDragStart = () => {
		if (window.navigator.vibrate) {
			window.navigator.vibrate(100);
		}
	};

	onDragEnd = result => {
		const { destination, source, draggableId } = result;
		const { songs } = this.state.playlist;

		if (!destination) {
			return;
		}

		if (destination.index === source.index) {
			return;
		}

		const newSongsIds = Array.from(this.state.playlist.songs);
		newSongsIds.splice(source.index, 1);
		newSongsIds.splice(
			destination.index,
			0,
			songs.find(song => song.id === draggableId)
		);

		this.setState({
			playlist: {
				...this.state.playlist,
				songs: newSongsIds
			}
		});
	};

	handleRemovePlaylistSong = id => {
		const { songs } = this.state.playlist;
		const filteredArray = songs.filter(song => song.id !== id);
		this.setState({
			...this.state,
			playlist: {
				...this.state.playlist,
				songs: filteredArray
			}
		});
	};

	render() {
		const {
			isCreating,
			isEditing,
			isError,
			error,
			playlist: { songs = [], title = "", isPublic = false }
		} = this.state;
		const { classes, selectedSongs } = this.props;

		return (
			<DragDropContext
				onDragStart={this.onDragStart}
				onDragEnd={this.onDragEnd}
			>
				<Modal open={isCreating || isEditing} className={classes.wrapper}>
					<ContainerModal>
						<div className={classes.modalWrapper}>
							<div className={classes.formWrapper}>
								{/* {isError && <ErrorValidateInfo type="playlist" error={error} />} */}
								<form onSubmit={this.handleFormSubmit} className={classes.form}>
									<Typography className={classes.modalTitle}>
										DODAJ PLAYLISTĘ
									</Typography>
									<TextField
										id="outlined-full-width"
										label="Nazwa"
										name="nazwa"
										onChange={this.handleChange}
										value={title}
										error={isError}
										autoComplete="off"
										placeholder="Podaj nazwę dla playlisty"
										margin="normal"
										fullWidth
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
									/>
									<FormControl>
										<InputLabel shrink htmlFor="select-multiple-native">
											Publiczne czy prywatne
										</InputLabel>
										<Select
											native
											value={isPublic}
											onChange={this.handleSelectChange}
											name="is-public"
											inputProps={{
												id: "select-multiple-native"
											}}
										>
											<option value="">Wybierz kategorię...</option>
											<option value={true}>Publiczne</option>
											<option value={false}>Prywatne</option>
										</Select>
									</FormControl>
									<SongsContainer
										songs={songs}
										selectedSongs={selectedSongs}
										removeSong={this.handleRemovePlaylistSong}
									/>
									{isEditing && (
										<InfoSnackBar message="Jesli chcesz dodać utwory, wróć do listy piosenek, zaznacz utwory i wróć tutaj ponownie. Wybrane piosenki pojawią się na dole listy. Pamiętaj, że nie pojawi się piosenka, która już znajduje się na liście. " />
									)}
									<Button style={{ marginRight: 15 }} type="submit">
										Zatwierdź
									</Button>
									<Button onClick={this.handleClose}>Wyjdź</Button>
								</form>
							</div>
						</div>
					</ContainerModal>
				</Modal>
			</DragDropContext>
		);
	}
}

export default withStyles(styles)(PlaylistModal);
