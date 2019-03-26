import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

const BASE_URL = "https://app-songbook.firebaseio.com/";

const styles = {
	paper: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "60%",
		height: "70%",
		backgroundColor: "white",
		outline: "none"
	},
	form: {
		padding: "25px",
		height: "100%"
	},
	textField: {
		display: "block",
		margin: 8
	},
	textFieldMultiline: {
		display: "block",
		margin: 8
	}
};

const categories = [
	"polskie piosenki",
	"zagraniczne piosenki",
	"piosenki harcerskie",
	"piosenki religijne",
	"piosenki turystyczne",
	"piosenki ludowe",
	"pieśni patriotyczne",
	"piosenki dla dzieci",
	"szanty",
	"kolędy",
	"biesiadne"
];

class CreateSongModal extends Component {
	state = {
		open: false,
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
		console.log(event.target.value);
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

		let verses = this.state.song.description.split("\n");

		const textWithChords = verses.map(verse => {
			const text = verse.split("<")[0].trim();
			const chords = verse.split("<")[1] && verse.split("<")[1].slice(0, -1);
			return { text, chords };
		});

		if (
			textWithChords[textWithChords.length - 1].text === "" &&
			textWithChords[textWithChords.length - 2].text === ""
		) {
			console.log("pops");
			textWithChords.pop();
			textWithChords.pop();
		}

		if (textWithChords[textWithChords.length - 1].text === "") {
			console.log("pops");
			textWithChords.pop();
		}
		console.log(textWithChords);
		fetch(`${BASE_URL}/songs.json`, {
			method: "POST",
			body: JSON.stringify({ ...this.state.song })
		})
			.then(() => {
				alert("Added song successfully");
			})
			.catch(() => alert("Error has occurred"));
	};

	render() {
		const {
			song: { category }
		} = this.state;
		return (
			<Fragment>
				<Button
					variant="outlined"
					style={{ height: "40px" }}
					onClick={this.handleOpen}
				>
					Dodaj utwór
				</Button>
				<Modal open={this.state.open} disableBackdropClick={true}>
					<div style={styles.paper}>
						<form style={styles.form} onSubmit={this.handleFormSubmit}>
							<TextField
								id="outlined-full-width"
								label="Tytuł"
								name="title"
								style={styles.textField}
								onChange={this.handleChange}
								value={this.state.song.title}
								autoComplete="off"
								placeholder="Wpisz nazwę utworu"
								margin="normal"
								fullWidth
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
							<TextField
								id="outlined-full-width"
								label="Wykonawca"
								name="performer"
								style={styles.textField}
								onChange={this.handleChange}
								value={this.state.song.performer}
								autoComplete="off"
								placeholder="Wpisz wykonawcę utworu"
								margin="normal"
								fullWidth
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
							<FormControl>
								<Select
									native
									value={this.state.song.category}
									onChange={this.handleChange}
									name="category"
								>
									{category ? null : (
										<option value="">Wybierz kategorię...</option>
									)}
									{categories.map(category => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</Select>
							</FormControl>
							<TextField
								id="outlined-textarea"
								label="Tekst piosenki"
								name="description"
								onChange={this.handleChangeSongText}
								value={this.state.song.description}
								placeholder="Tutaj wpisz tekst piosenki oraz chwyty"
								style={styles.textField}
								multiline
								rows="18"
								fullWidth
								margin="normal"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
							<Button type="submit">Zatwierdź</Button>
							<Button onClick={this.handleClose}>Wyjdź</Button>
						</form>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default CreateSongModal;
