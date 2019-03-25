import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";

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
		title: "",
		performer: "",
		description: "",
		category: ""
	};

	handleOpen = () => {
		this.setState({ open: true });
	};

	handleClose = () => {
		this.setState({ open: false });
	};

	handleChange = e => {
		this.setState({
			category: e.target.value
		});
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
						<form style={styles.form}>
							<TextField
								id="outlined-full-width"
								label="Tytuł"
								style={styles.textField}
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
								style={styles.textField}
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
