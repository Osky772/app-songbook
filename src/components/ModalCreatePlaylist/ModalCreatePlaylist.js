import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import {
	WrapperInModal,
	FormWrapper,
	ContainerCreatePlaylist
} from "../containers/StyledContainers";
import { DragDropContext } from "react-beautiful-dnd";
import SongsContainer from "./SongsContainer";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class ModalCreatePlaylist extends Component {
	state = {
		isCreating: false,
		isEditing: false,
		playlist: {
			title: "",
			songs: []
		}
	};

	static getDerivedStateFromProps(props, state) {
		if (
			props.selectedSongs.length !== state.playlist.songs.length &&
			props.selectedSongs.length !== 0 &&
			props.isCreating !== state.isCreating
		) {
			return {
				...state,
				isCreating: props.isCreating,
				playlist: {
					title: props.title,
					songs: props.selectedSongs
				}
			};
		}

		if (Boolean(props.editedPlaylist.id) !== state.isEditing) {
			return {
				...state,
				playlist: props.editedPlaylist,
				isEditing: true
			};
		}

		return null;
	}

	handleChange = e => {
		if (this.props.editedPlaylist.id) {
			console.log("here");
			this.setState({
				...this.state,
				playlist: {
					...this.props.editedPlaylist,
					title: e.target.value
				}
			});
		} else {
			this.setState({
				...this.state,
				playlist: {
					...this.state.playlist,
					title: e.target.value
				}
			});
		}
	};

	handleFormSubmit = e => {
		e.preventDefault();

		if (this.state.playlist.id) {
			fetch(`${BASE_URL}/playlists/${this.state.playlist.id}.json`, {
				method: "PUT",
				body: JSON.stringify(this.state.playlist)
			}).then(() => alert("Playlist edited successfully"));
		} else {
			fetch(`${BASE_URL}/playlists.json`, {
				method: "POST",
				body: JSON.stringify({ ...this.state.playlist })
			})
				.then(() => {
					alert("Added playlist successfully");
				})
				.catch(() => alert("Error has occurred"));
		}
	};

	handleClose = () => {
		const { handleClose } = this.props;
		this.setState({ open: false, isEditing: false, editedPlaylist: "" });

		handleClose();
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

	render() {
		const {
			playlist: { songs = [], title = "" }
		} = this.state;

		console.log(this.state.isCreating);

		return (
			<DragDropContext onDragEnd={this.onDragEnd}>
				<Modal
					open={this.state.isCreating || this.state.isEditing}
					disableBackdropClick={true}
				>
					<ContainerCreatePlaylist>
						<WrapperInModal>
							<FormWrapper>
								<form onSubmit={this.handleFormSubmit}>
									<TextField
										id="outlined-full-width"
										label="Nazwa"
										name="nazwa"
										onChange={this.handleChange}
										value={title}
										autoComplete="off"
										placeholder="Podaj nazwę dla playlisty"
										margin="normal"
										fullWidth
										variant="outlined"
										InputLabelProps={{
											shrink: true
										}}
									/>
									<SongsContainer songs={songs} />
									<Button type="submit">Zatwierdź</Button>
									<Button onClick={this.handleClose}>Wyjdź</Button>
								</form>
							</FormWrapper>
						</WrapperInModal>
					</ContainerCreatePlaylist>
				</Modal>
			</DragDropContext>
		);
	}
}

export default ModalCreatePlaylist;
