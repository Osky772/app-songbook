import React, { Component } from "react";
import { SongsListRow } from "../containers/StyledContainers";
import Typography from "@material-ui/core/Typography";

class PlaylistSongList extends Component {
	state = {};
	render() {
		const { songs } = this.props;
		return songs.map(({ id, performer, title }, nr) => (
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
		));
	}
}

export default PlaylistSongList;
