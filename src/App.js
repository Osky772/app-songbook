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
		songs: [],
		song: {}
	};

	componentDidMount() {
		fetch(`${BASE_URL}/songs.json`)
			.then(r => r.json())
			.then(songs => {
				console.log(songs);
				console.log(Object.keys(songs));
				const arraySongs =
					songs &&
					Object.keys(songs).map(key => ({
						id: key,
						...songs[key]
					}));
				this.setState({ songs: arraySongs || [] });
			});
	}

	getSong = id => {
		const song = this.state.songs.find(song => {
			return song.id === Number(id);
		});
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
						render={props => (
							<SongsList getSong={this.getSong} {...props} songs={songs} />
						)}
					/>
					<Route path="/playlisty" render={() => <Playlists />} />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
