import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import Song from "./components/Song";
import InitPage from "./components/InitPage";
import Playlist from "./components/Playlist";

class App extends Component {
	state = {
		song: "",
		selectedSongs: []
	};

	handleSelectSongs = selectedSongs => {
		this.setState({ selectedSongs });
	};

	render() {
		const { selectedSongs } = this.state;

		return (
			<Fragment>
				<CssBaseline />
				<Header
					selectedSongs={selectedSongs}
					closeEditedPlaylist={this.closeEditedPlaylist}
				/>
				<Route exact path="/" render={props => <InitPage {...props} />} />
				<Route path={"/lista-piosenek/:songId"} component={Song} />
				<Route
					exact
					path="/lista-piosenek"
					render={props => (
						<SongsList
							handleSelectSongs={this.handleSelectSongs}
							selectedSongs={selectedSongs}
							{...props}
						/>
					)}
				/>
				<Route exact path="/playlisty" component={Playlists} />
				<Route
					path={"/playlisty/:playlistId"}
					render={props => (
						<Playlist {...props} selectedSongs={selectedSongs} />
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
