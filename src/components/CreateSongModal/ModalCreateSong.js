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
		isError: false,
		error: {
			title: false,
			description: false,
			category: false
		},
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
		this.setState({
			open: false,
			isError: false,
			error: {
				title: false,
				description: false,
				category: false
			}
		});
	};

	handleChange = event => {
		console.log(this.state.song);
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
		const { song } = this.state;
		const required = Object.keys(song).filter(key => key !== "performer");
		const emptyValues = required.filter(key => song[key] === "");
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
		} else {
			fetch(`${BASE_URL}/songs.json`, {
				method: "POST",
				body: JSON.stringify({ ...this.state.song })
			})
				.then(() => {
					alert("Added song successfully");
					this.setState({
						open: false,
						isError: false,
						error: {},
						isPreviewed: false,
						song: {
							title: "",
							performer: "",
							description: "",
							category: ""
						}
					});
				})
				.catch(() => alert("Error has occurred"));
		}
	};

	handleSongPreview = () => {
		const { isPreviewed } = this.state;
		this.setState({
			...this.state,
			isPreviewed: !isPreviewed
		});
	};

	render() {
		const { song, open, isPreviewed, isError, error } = this.state;
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
								error={error}
								isError={isError}
							/>
						</WrapperInModal>
					</ContainerModal>
				</Modal>
				<ModalPreviewSong
					isPreviewed={isPreviewed}
					handleSongPreview={this.handleSongPreview}
					song={song}
				/>
			</Fragment>
		);
	}
}

export default CreateSongModal;
