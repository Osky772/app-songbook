import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	SongsListRow,
	ListItem,
	ListContainer
} from "../containers/StyledContainers";
import Typography from "@material-ui/core/Typography";
import SearchForm from "../SearchForm";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlists extends Component {
	state = {
		inputValue: "",
		playlists: [],
		editedPlaylist: {},
		isEditing: false
	};

	getPlaylists = () => {
		fetch(`${BASE_URL}/playlists/public.json`)
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
	};

	componentDidMount() {
		this.getPlaylists();
	}

	handleInputChange = e => {
		this.setState({ inputValue: e.target.value });
	};

	render() {
		const { inputValue = "", playlists = [] } = this.state;
		const searchedPlaylists = playlists.filter(playlist => {
			const playlistTitle = playlist.title.toLowerCase();
			const searchText = inputValue.trim().toLowerCase();
			return playlistTitle.includes(searchText);
		});

		return (
			<ListContainer>
				<SearchForm
					handleChange={this.handleInputChange}
					label="Wyszukaj playlistę"
					placeholder="Wpisz nazwę playlisty"
				/>
				{searchedPlaylists.map(playlist => (
					<ListItem key={playlist.id}>
						<Link key={playlist.id} to={`/playlisty/${playlist.id}`}>
							<h1>{playlist.title}</h1>
							{playlist.songs !== undefined &&
								playlist.songs.map(({ performer, title, id }, nr) => (
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
					</ListItem>
				))}
			</ListContainer>
		);
	}
}

export default Playlists;
