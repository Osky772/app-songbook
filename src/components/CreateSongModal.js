import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

const styles = {
	paper: {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		width: "500px",
		backgroundColor: "white",
		outline: "none"
	}
};

class CreateSongModal extends Component {
	state = {
		open: false
	};

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
					Dodaj utwór
				</Button>
				<Modal open={this.state.open} disableBackdropClick={true}>
					<div style={styles.paper}>
						<Typography variant="h6" id="modal-title">
							Text in a modal
						</Typography>
						<Typography variant="subtitle1" id="simple-modal-description">
							Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
						</Typography>
						<Button onClick={this.handleClose}>X</Button>
					</div>
				</Modal>
			</Fragment>
		);
	}
}

export default CreateSongModal;
