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
		song: {}
	};

	getSong = song => {
		this.setState({ song });
	};

	render() {
		const { songs, song } = this.state;
		return (
			<BrowserRouter>
				<Fragment>
					<CssBaseline />
					<Header />
					<Route
						path={"/lista-piosenek/:songId"}
						render={props => <Song song={song} {...props} />}
					/>
					<Route
						exact
						path="/lista-piosenek"
						render={props => <SongsList getSong={this.getSong} {...props} />}
					/>
					<Route path="/playlisty" render={() => <Playlists />} />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
