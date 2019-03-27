import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class CreatePDF extends Component {
	state = {};
	render() {
		const { selectedSongs } = this.props;
		return (
			<Button
				variant="outlined"
				style={{ height: "40px" }}
				onClick={() => console.log(selectedSongs)}
			>
				Create PDF
			</Button>
		);
	}
}

export default CreatePDF;
