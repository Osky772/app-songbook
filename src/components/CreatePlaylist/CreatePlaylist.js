import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import ModalCreatePlaylist from "../PlaylistModals/CreatePlaylist/ModalCreatePlaylist";

class CreatePlaylist extends Component {
	state = {
		isCreating: false
	};

	handleCreate = () => {
		this.setState({ isCreating: true });
	};

	handleClose = () => {
		this.setState({ isCreating: false });
	};

	render() {
		const { isCreating } = this.state;

		const { selectedSongs = [], editedPlaylist = "" } = this.props;

		return (
			<Fragment>
				<Button
					variant="outlined"
					style={{ height: "40px" }}
					onClick={selectedSongs.length > 0 ? this.handleCreate : null}
				>
					DODAJ PLAYLISTĘ
				</Button>
				{isCreating && (
					<ModalCreatePlaylist
						selectedSongs={selectedSongs}
						editedPlaylist={editedPlaylist}
						isCreating={isCreating}
						handleClose={this.handleClose}
					/>
				)}
			</Fragment>
		);
	}
}

export default CreatePlaylist;
