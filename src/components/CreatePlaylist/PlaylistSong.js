import React, { Component } from "react";
import { SongsListRow } from "../containers/StyledContainers";
import Typography from "@material-ui/core/Typography";

class PlaylistSong extends Component {
	state = {};
	render() {
		const {
			song: { id, performer, title },
			nr
		} = this.props;
		return (
			<SongsListRow key={id} elevation={1}>
				<Typography variant="h5" style={{ marginRight: 15 }}>
					{nr + 1}.
				</Typography>
				<div>
					<Typography variant="h5">
						{performer ? performer + " - " + title : title}
					</Typography>
				</div>
			</SongsListRow>
		);
	}
}

export default PlaylistSong;
