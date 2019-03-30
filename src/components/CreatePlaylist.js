import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class CreatePlaylist extends Component {
	state = {};
	render() {
		return (
			<Button variant="outlined" style={{ height: "40px" }}>
				DODAJ PLAYLISTĘ
			</Button>
		);
	}
}

export default CreatePlaylist;
