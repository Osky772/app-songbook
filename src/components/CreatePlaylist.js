import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import { WrapperInModal, FormWrapper } from "./containers/StyledContainers";

class CreatePlaylist extends Component {
	state = {
		open: false,
		songs: []
	};

	static getDerivedStateFromProps(props, state) {
		if (props.selectedSongs.length !== state.songs.length) {
			return {
				songs: props.selectedSongs
			};
		}
		return null;
	}

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	render() {
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
							<form>
								<TextField
									id="outlined-full-width"
									label="Tytuł"
									name="title"
									// style={styles.textField}
									// onChange={this.handleChange}
									// value={this.state.song.title}
									autoComplete="off"
									placeholder="Wpisz nazwę utworu"
									margin="normal"
									fullWidth
									variant="outlined"
									InputLabelProps={{
										shrink: true
									}}
								/>
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
