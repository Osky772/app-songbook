import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import { ContainerModal, WrapperInModal } from "../containers/StyledContainers";
import FormAddSong from "./FormAddSong";
import ModalPreviewSong from "./ModalPreviewSong";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class CreateSongModal extends Component {
	state = {
		open: false,
		isPreviewed: false,
		song: {
			title: "",
			performer: "",
			description: "",
			category: ""
		}
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = event => {
		this.setState({
			song: {
				...this.state.song,
				[event.currentTarget.name]: event.target.value
			}
		});
	};

	handleChangeSongText = event => {
		let inputValue = event.target.value;
		inputValue = inputValue.startsWith("\n")
			? inputValue.substr(1)
			: inputValue;

		inputValue = inputValue.endsWith("\n\n\n")
			? inputValue.substr(0, inputValue.length - 1)
			: inputValue;

		this.setState({
			song: {
				...this.state.song,
				[event.currentTarget.name]: inputValue
			}
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		fetch(`${BASE_URL}/songs.json`, {
			method: "POST",
			body: JSON.stringify({ ...this.state.song })
		})
			.then(() => {
				alert("Added song successfully");
				this.setState({
					song: {}
				});
			})
			.catch(() => alert("Error has occurred"));
	};

	handleSongPreview = () => {
		const { isPreviewed } = this.state;
		this.setState({ isPreviewed: !isPreviewed });
	};

	render() {
		const { song, open, isPreviewed } = this.state;
		return (
			<Fragment>
				<Button
					variant="outlined"
					style={{ height: "40px" }}
					onClick={this.handleOpen}
				>
					Dodaj utwór
				</Button>
				<Modal open={open} disableBackdropClick={true}>
					<ContainerModal>
						<WrapperInModal>
							<FormAddSong
								song={song}
								handleSubmit={this.handleFormSubmit}
								handleChange={this.handleChange}
								handleChangeSongText={this.handleChangeSongText}
								handleCloseModal={this.handleClose}
								handleSongPreview={this.handleSongPreview}
							/>
						</WrapperInModal>
					</ContainerModal>
				</Modal>
				<ModalPreviewSong
					isPreviewed={isPreviewed}
					handleSongPreview={this.handleSongPreview}
				/>
			</Fragment>
		);
	}
}

export default CreateSongModal;
