import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class CreatePDF extends Component {
	state = {
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

	render() {
		return (
			<Button
				variant="outlined"
				style={{ height: "40px" }}
				onClick={() => console.log(this.state.songs)}
			>
				Create PDF
			</Button>
		);
	}
}

export default CreatePDF;
