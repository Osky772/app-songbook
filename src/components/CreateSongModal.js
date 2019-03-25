import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";

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

	handleFormSubmit = e => {
		e.preventDefault();
		fetch(`${BASE_URL}/songs.json`, {
			method: "POST",
			body: JSON.stringify({ ...this.state.song })
		})
			.then(() => alert("Added burger successfully"))
			.catch(() => alert("Error has occurred"));
	};

	render() {
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
								value={this.state.title}
								autoComplete="off"
								placeholder="Podaj nazwę utworu"
								margin="normal"
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
								value={this.state.performer}
								autoComplete="off"
								placeholder="Podaj wykonwcę"
								margin="normal"
								variant="outlined"
								InputLabelProps={{
									shrink: true
								}}
							/>
							<FormControl>
								<NativeSelect
									value={this.state.age}
									onChange={this.handleChange}
									name="category"
								>
									{categories.map(category => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</NativeSelect>
							</FormControl>
							<TextField
								id="outlined-textarea"
								label="Multiline Placeholder"
								name="description"
								onChange={this.handleChange}
								value={this.state.description}
								placeholder="Placeholder"
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
