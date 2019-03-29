import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import Playlists from "./components/Playlists";
import SongsList from "./components/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import Song from "./components/Song";
import InitPage from "./components/InitPage";

class App extends Component {
	state = {
		song: "",
		selectedSongs: []
	};

	handleSelectSongs = selectedSongs => {
		this.setState({ selectedSongs });
	};

	render() {
		return (
			<Fragment>
				<CssBaseline />
				<Header />
				<Route exact path="/" render={props => <InitPage {...props} />} />
				<Route path={"/lista-piosenek/:songId"} component={Song} />
				<Route
					exact
					path="/lista-piosenek"
					render={props => (
						<SongsList
							// onCheckboxSelect={this.handleCheckboxSelect}
							// checked={selectedSongs}
							handleSelectSongs={this.handleSelectSongs}
							{...props}
						/>
					)}
				/>
				<Route path="/playlisty" render={() => <Playlists />} />
			</Fragment>
		);
	}
}

export default App;
