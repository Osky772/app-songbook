import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	SongsListRow,
	PlaylistItem,
	PlaylistContainer
} from "./containers/StyledContainers";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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

	handleEditPlaylist = id => {
		const { editPlaylist } = this.props;
		editPlaylist(id);
	};

	render() {
		const { playlists = [] } = this.state;
		return (
			<PlaylistContainer>
				{playlists.map(({ songs, title, id }) => (
					<PlaylistItem key={id}>
						<h1>{title}</h1>
						<Button onClick={() => this.handleEditPlaylist(id)}>Edytuj</Button>
						<Link key={id} to={`/playlisty/${id}`}>
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
						</Link>
					</PlaylistItem>
				))}
			</PlaylistContainer>
		);
	}
}

export default Playlists;
