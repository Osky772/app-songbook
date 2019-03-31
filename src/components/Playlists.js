import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import PageWrapper from "./containers/PageWrapper";
import { PlaylistItem } from "./containers/StyledContainers";

class Playlists extends Component {
	render() {
		return (
			<PageWrapper>
				<PlaylistItem>
					<h1>Playlist 1</h1>
				</PlaylistItem>
			</PageWrapper>
		);
	}
}

export default Playlists;
