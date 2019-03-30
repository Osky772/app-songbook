import React, { Component } from "react";
import Button from "@material-ui/core/Button";

class CreatePlaylist extends Component {
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

	handleClick = () => {
		console.log(this.state.songs);
	};

	render() {
		return (
			<Button
				variant="outlined"
				style={{ height: "40px" }}
				onClick={this.handleClick}
			>
				DODAJ PLAYLISTĘ
			</Button>
		);
	}
}

export default CreatePlaylist;
