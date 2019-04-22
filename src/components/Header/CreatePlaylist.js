import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import PlaylistModal from "../Playlists/Create/PlaylistModal";
import { withStyles } from "@material-ui/core/styles";
import { MdPlaylistAdd } from "react-icons/md";
import Fab from "@material-ui/core/Fab";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";

const styles = theme => ({
	Btn: {
		color: "white",
		borderColor: "white",
		fontSize: "14px",
		fontWeight: "bold",
		textTransform: "none",
		padding: "3px 25px",
		marginLeft: 15,
		"&:hover": {
			backgroundColor: "#02a8f4"
		}
	},
	xs: {
		fontSize: 35,
		position: "fixed",
		width: 50,
		height: 50,
		padding: 0,
		borderRadius: 50,
		bottom: 20,
		right: 60,
		backgroundColor: theme.palette.primary.main,
		color: "white",
		boxShadow: "#464646 1px 2px 4px 0",
		"&:disabled": {
			backgroundColor: "#c5c5c5",
			color: "white",
			boxShadow: "#464646 1px 2px 4px 0"
		}
	}
});

const WithWidth = toRenderProps(withWidth());

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
			<WithWidth>
				{({ width }) => (
					<Fragment>
						{width === "xs" || width === "sm" ? (
							<Fab
								className={classes.xs}
								disabled={selectedSongs.length === 0}
								onClick={selectedSongs.length > 0 ? this.handleCreate : null}
							>
								<MdPlaylistAdd />
							</Fab>
						) : (
							<Button
								variant="outlined"
								disabled={selectedSongs.length === 0}
								className={classes.Btn}
								onClick={selectedSongs.length > 0 ? this.handleCreate : null}
							>
								Dodaj playlistę
							</Button>
						)}

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
				)}
			</WithWidth>
		);
	}
}

export default withStyles(styles)(CreatePlaylist);
