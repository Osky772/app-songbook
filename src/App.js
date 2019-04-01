import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import Song from "./components/Song";
import InitPage from "./components/InitPage";
import Playlist from "./components/Playlist";

class App extends Component {
	state = {
		song: "",
		selectedSongs: [],
		editedPlaylist: ""
	};

	handleSelectSongs = selectedSongs => {
		this.setState({ selectedSongs });
	};

	editPlaylist = playlist => {
		this.setState({ ...this.state, editedPlaylist: playlist });
	};

	closeEditedPlaylist = () => {
		this.setState({ editedPlaylist: "" });
	};

	render() {
		const { selectedSongs, editedPlaylist } = this.state;

		return (
			<Fragment>
				<CssBaseline />
				<Header
					editedPlaylist={editedPlaylist}
					selectedSongs={selectedSongs}
					closeEditedPlaylist={this.closeEditedPlaylist}
				/>
				<Route exact path="/" render={props => <InitPage {...props} />} />
				<Route path={"/lista-piosenek/:songId"} component={Song} />
				<Route
					exact
					path="/lista-piosenek"
					render={props => (
						<SongsList handleSelectSongs={this.handleSelectSongs} {...props} />
					)}
				/>
				<Route
					exact
					path="/playlisty"
					render={() => <Playlists editPlaylist={this.editPlaylist} />}
				/>
				<Route path={"/playlisty/:playlistId"} component={Playlist} />
			</Fragment>
		);
	}
}

export default App;
