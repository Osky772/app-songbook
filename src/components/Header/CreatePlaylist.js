import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import PlaylistModal from "../Playlists/Create/CreatePlaylistModal";
import { withStyles } from "@material-ui/core/styles";

const styles = {
	Btn: {
		color: "white",
		borderColor: "white",
		fontSize: "14px",
		fontWeight: "bold",
		marginLeft: 15,
		"&:hover": {
			backgroundColor: "#02a8f4"
		}
	}
};

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
		const { classes } = this.props;

		const {
			selectedSongs = [],
			editedPlaylist = "",
			handleSelectSongs,
			user
		} = this.props;

		return (
			<Fragment>
				<Button
					variant="outlined"
					className={classes.Btn}
					onClick={selectedSongs.length > 0 ? this.handleCreate : null}
				>
					DODAJ PLAYLISTĘ
				</Button>
				{isCreating && (
					<PlaylistModal
						selectedSongs={selectedSongs}
						handleSelectSongs={handleSelectSongs}
						editedPlaylist={editedPlaylist}
						isCreating={isCreating}
						handleClose={this.handleClose}
						user={user}
					/>
				)}
			</Fragment>
		);
	}
}

export default withStyles(styles)(CreatePlaylist);
