import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";
import Song from "./components/Song";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class App extends Component {
	state = {
		song: ""
	};

	// getSong = id => {
	// 	const song = this.state.songs.find(song => {
	// 		return song.id === id;
	// 	});
	// 	this.setState({ song });
	// };

	render() {
		const { songs, song } = this.state;
		return (
			<BrowserRouter>
				<Fragment>
					<CssBaseline />
					<Header />
					<Route
						path={"/lista-piosenek/:songId"}
						component={Song}
						// render={props => <Song />}
					/>
					<Route
						exact
						path="/lista-piosenek"
						render={props => <SongsList {...props} />}
					/>
					<Route path="/playlisty" render={() => <Playlists />} />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
