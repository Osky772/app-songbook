import React, { Component } from "react";
import PageWrapper from "./containers/PageWrapper";
import { SongsListRow, PlaylistItem } from "./containers/StyledContainers";
import Typography from "@material-ui/core/Typography";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlists extends Component {
	state = {
		playlists: []
	};

	componentDidMount() {
		fetch(`${BASE_URL}/playlists.json`)
			.then(r => r.json())
			.then(playlists => {
				const arrayPlaylists =
					playlists &&
					Object.keys(playlists).map(key => ({
						id: key,
						...playlists[key]
					}));
				this.setState({ playlists: arrayPlaylists || [] });
			});
	}

	render() {
		const { playlists = [] } = this.state;
		console.log(playlists);
		return (
			<PageWrapper>
				{playlists.map(({ songs, title, id }) => (
					<PlaylistItem key={id}>
						<h1>{title}</h1>
						{songs.map(({ performer, title, id }, nr) => (
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
						))}
					</PlaylistItem>
				))}
			</PageWrapper>
		);
	}
}

export default Playlists;
