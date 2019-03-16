import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter, Route } from "react-router-dom";

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Fragment>
					<CssBaseline />
					<Header />
					<Route
						path="/lista-piosenek"
						render={props => <SongsList {...props} />}
					/>
					<Route path="/playlisty" render={props => <Playlists />} />
				</Fragment>
			</BrowserRouter>
		);
	}
}

export default App;
