import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { BrowserRouter, Route } from "react-router-dom";
import Song from "./components/Song";

class App extends Component {
	state = {
		songs: [],
		song: {}
	};

	async componentDidMount() {
		const songs = await (await fetch("/data.json")).json();
		this.setState({ songs });
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
