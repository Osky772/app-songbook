import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import {
	WrapperInModal,
	FormWrapper,
	ContainerModal
} from "../../containers/StyledContainers";
import SongsContainer from "../SongsContainer";
import InfoSnackBar from "../../InfoSnackBar";
import Button from "@material-ui/core/Button";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class EditPlaylistModal extends Component {
	state = {
		playlist: {
			id: null,
			title: "",
			songs: []
		}
	};

	// static getDerivedStateFromProps(props, state) {

	// }

	handleChange = e => {
		this.setState({
			playlist: {
				...this.state.playlist,
				title: e.target.value
			}
		});
	};

	handleFormSubmit = () => {
		fetch(`${BASE_URL}/playlists/${this.state.playlist.id}.json`, {
			method: "PUT",
			body: JSON.stringify(this.state.playlist)
		})
			.then(() => alert("Playlist edited successfully"))
			.then(() => this.props.fetchData());
	};

	render() {
		const {
			isEditing,
			editedPlaylist,
			handleClose,
			selectedSongs,
			fetchData
		} = this.props;
		const {
			playlist: { title = "", songs = [] }
		} = this.state;

		return (
			<Modal open={isEditing} disableBackdropClick={true}>
				<ContainerModal>
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
								<SongsContainer
									songs={songs}
									selectedSongs={selectedSongs}
									removeSong={this.handleRemovePlaylistSong}
								/>
								{isEditing && (
									<InfoSnackBar message="Jesli chcesz dodać kolejne utwory, wróć do listy piosenek, zaznacz utwory i wróć tutaj ponownie. Wybrane piosenki pojawią się na dole listy. Pamiętaj, że nie pojawi się piosenka, która już znajduje się na liście. " />
								)}
								<Button type="submit">Zatwierdź</Button>
								<Button onClick={this.handleClose}>Wyjdź</Button>
							</form>
						</FormWrapper>
					</WrapperInModal>
				</ContainerModal>
			</Modal>
		);
	}
}

export default EditPlaylistModal;
