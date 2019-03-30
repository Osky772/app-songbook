import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { MdError as ErrorIcon } from "react-icons/md";
import { WrapperInModal, FormWrapper } from "./containers/StyledContainers";

const BASE_URL = "https://app-songbook.firebaseio.com/";

const styles = {
	textField: {
		display: "block",
		marginBottom: 15
	},
	select: {
		marginBottom: 15
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
					<WrapperInModal>
						<FormWrapper>
							<form onSubmit={this.handleFormSubmit}>
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
										style={styles.select}
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
								<SnackbarContent
									style={{
										backgroundColor: "#fca525",
										margin: "15px 0 35px 0",
										maxWidth: "100%"
									}}
									message={
										<span style={{ display: "flex", marginLeft: "-5px" }}>
											<ErrorIcon
												style={{
													fontSize: 50,
													height: "100%",
													marginRight: 10
												}}
											/>

											<span>
												<div style={{ fontWeight: "bold" }}>{"Uwaga!"}</div>
												{
													"Kolejne wersy oddzielaj enterem. Chwyty przypisane do danego wersu dodawaj w tej samej linii w nawiasach ostrych, oddzielonymi przecinkami, np. Tak, tak, tam w lustrze... <G, d, C>."
												}
											</span>
										</span>
									}
								/>
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
						</FormWrapper>
					</WrapperInModal>
				</Modal>
			</Fragment>
		);
	}
}

export default CreateSongModal;
