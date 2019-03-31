import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {
	WrapperInModal,
	FormWrapper,
	SongsListRow
} from "./containers/StyledContainers";

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

	render() {
		const {
			playlist: { songs = [], title = "" }
		} = this.state;

		return (
			<Fragment>
				<Button
					variant="outlined"
					style={{ height: "40px" }}
					onClick={this.handleOpen}
				>
					DODAJ PLAYLISTĘ
				</Button>
				<Modal open={this.state.open} disableBackdropClick={true}>
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
								<Typography variant="h5" style={{ margin: "10px 0 25px 0" }}>
									Wybrane piosenki
								</Typography>
								{songs.map(({ id, performer, title }, nr) => (
									<SongsListRow key={id} elevation={1}>
										<Typography variant="h5" style={{ marginRight: 15 }}>
											{nr + 1}.
										</Typography>
										<div>
											<Typography variant="h5">
												{performer ? performer + " - " + title : title}
											</Typography>
										</div>
									</SongsListRow>
								))}
								<Button type="submit">Zatwierdź</Button>
								<Button onClick={this.handleClose}>Wyjdź</Button>
							</form>
						</FormWrapper>
					</WrapperInModal>
				</Modal>
			</Fragment>
		);
	}
}

export default CreatePlaylist;
