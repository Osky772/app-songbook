import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	SongsListRow,
	PlaylistItem,
	PlaylistContainer
} from "./containers/StyledContainers";
import Typography from "@material-ui/core/Typography";
import SearchForm from "./SearchForm";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlists extends Component {
	state = {
		inputValue: "",
		playlists: [],
		editedPlaylist: {},
		isEditing: false
	};

	getPlaylists = () => {
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
	};

	componentDidMount() {
		this.getPlaylists();
	}

	// handleEditPlaylist = playlist => {
	// 	this.setState({ editedPlaylist: playlist, isEditing: true });
	// };

	// handleRemovePlaylist = playlistId => {
	// 	fetch(`${BASE_URL}/playlists/${playlistId}.json`, {
	// 		method: "DELETE"
	// 	})
	// 		.then(() => alert("Removed playlist successfully"))
	// 		.then(() => this.getPlaylists());
	// };

	// handleCloseEditing = () => {
	// 	this.setState({ editedPlaylist: {}, isEditing: false });
	// };

	handleInputChange = e => {
		this.setState({ inputValue: e.target.value });
	};

	render() {
		const {
			inputValue = "",
			playlists = [],
			isEditing,
			editedPlaylist
		} = this.state;
		const { selectedSongs } = this.props;
		const searchedPlaylists = playlists.filter(playlist => {
			const playlistTitle = playlist.title.toLowerCase();
			const searchText = inputValue.trim().toLowerCase();
			return playlistTitle.includes(searchText);
		});

		return (
			<PlaylistContainer>
				{/* {isEditing && (
					<ModalCreatePlaylist
						isEditing={isEditing}
						editedPlaylist={editedPlaylist}
						handleClose={this.handleCloseEditing}
						getPlaylists={this.getPlaylists}
						selectedSongs={selectedSongs}
					/>
				)} */}
				<SearchForm
					handleChange={this.handleInputChange}
					label="Wyszukaj playlistę"
					placeholder="Wpisz nazwę playlisty"
				/>
				{searchedPlaylists.map(playlist => (
					<PlaylistItem key={playlist.id}>
						<h1>{playlist.title}</h1>
						{/* <Button onClick={() => this.handleEditPlaylist(playlist)}>
							Edytuj
						</Button>
						<Button onClick={() => this.handleRemovePlaylist(playlist.id)}>
							Usuń
						</Button> */}
						<Link key={playlist.id} to={`/playlisty/${playlist.id}`}>
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
					</PlaylistItem>
				))}
			</PlaylistContainer>
		);
	}
}

export default Playlists;
