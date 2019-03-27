import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import Song from "./components/Song";

class App extends Component {
	state = {
		song: ""
	};

	componentDidMount() {
		console.log(window.location);
		// const initialPage = window.location.origin;
		// const originalPagePathname = "/lista-piosenek";
		// if (window.location.pathname === "/") {
		// 	window.location.pathname = originalPagePathname;
		// }
	}

	render() {
		return (
			<Fragment>
				<CssBaseline />
				<Header />
				<Route path={"/lista-piosenek/:songId"} component={Song} />
				<Route
					path="/lista-piosenek"
					render={props => <SongsList {...props} />}
				/>
				<Route path="/playlisty" render={() => <Playlists />} />
			</Fragment>
		);
	}
}

export default App;
