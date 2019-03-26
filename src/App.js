import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";
import Song from "./components/Song";

class App extends Component {
	state = {
		song: ""
	};

	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<CssBaseline />
					<Header />
					<Route path={"/lista-piosenek/:songId"} component={Song} />
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
