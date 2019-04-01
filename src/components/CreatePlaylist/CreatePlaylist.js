import React, { Component, Fragment } from "react";
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

class CreatePlaylist extends Component {
	state = {
		open: false,
		playlist: {
			title: "",
			songs: []
		}
	};

	static getDerivedStateFromProps(props, state) {
		if (props.selectedSongs.length !== state.playlist.songs.length) {
			return {
				playlist: {
					songs: props.selectedSongs
				}
			};
		}
		return null;
	}

	handleChange = e => {
		this.setState({
			playlist: {
				...this.state.playlist,
				title: e.target.value
			}
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		fetch(`${BASE_URL}/playlists.json`, {
			method: "POST",
			body: JSON.stringify({ ...this.state.playlist })
		})
			.then(() => {
				alert("Added playlist successfully");
			})
			.catch(() => alert("Error has occurred"));
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
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
		console.log(newSongsIds);
		newSongsIds.splice(source.index, 1);
		newSongsIds.splice(
			destination.index,
			0,
			songs.find(song => song.id === draggableId)
		);

		console.log(newSongsIds);

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

		return (
			<Fragment>
				<DragDropContext onDragEnd={this.onDragEnd}>
					<Button
						variant="outlined"
						style={{ height: "40px" }}
						onClick={this.handleOpen}
					>
						DODAJ PLAYLISTĘ
					</Button>
					<Modal open={this.state.open} disableBackdropClick={true}>
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
			</Fragment>
		);
	}
}

export default CreatePlaylist;
