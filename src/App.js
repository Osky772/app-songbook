import React, { Component, Fragment } from "react";
import Header from "./components/Header/Header";
import Playlists from "./components/Playlists/List/Playlists";
import SongsList from "./components/Songs/List/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import Song from "./components/Songs/Page/Song";
import InitPage from "./components/InitPage";
import Playlist from "./components/Playlists/Page/Playlist";
import * as firebase from "firebase";
import AdminPage from "./components/Admin/AdminPage";

var config = {
	apiKey: "AIzaSyC8W028Pyt7eD2EXrvnqlAmXSD0zB007t4",
	authDomain: "app-songbook.firebaseapp.com",
	databaseURL: "https://app-songbook.firebaseio.com",
	projectId: "app-songbook",
	storageBucket: "app-songbook.appspot.com",
	messagingSenderId: "666603805553"
};
firebase.initializeApp(config);

export const db = firebase.database();

class App extends Component {
	state = {
		user: null,
		song: "",
		selectedSongs: [],
		isDrawerOpen: false
	};

	handleSelectSongs = selectedSongs => {
		this.setState({ selectedSongs });
	};

	toggleDrawer = open => {
		this.setState({ ...this.state, isDrawerOpen: open });
	};

	componentDidMount() {
		const ref = firebase.auth().onAuthStateChanged(user => {
			this.setState({
				user
			});
		});

		this.setState({
			ref
		});
	}

	componentWillUnmount() {
		this.state.ref && this.state.ref();
	}

	render() {
		const { selectedSongs, user, isDrawerOpen } = this.state;
		return (
			<Fragment>
				<CssBaseline />
				<Header
					selectedSongs={selectedSongs}
					handleSelectSongs={this.handleSelectSongs}
					user={user}
					toggleDrawer={this.toggleDrawer}
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
							isDrawerOpen={isDrawerOpen}
							toggleDrawer={this.toggleDrawer}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path="/playlisty"
					render={props => <Playlists user={user} {...props} />}
				/>
				<Route
					path={"/playlisty/:playlistId"}
					render={props => (
						<Playlist
							{...props}
							selectedSongs={selectedSongs}
							handleSelectSongs={this.handleSelectSongs}
							user={user}
						/>
					)}
				/>
				<Route
					path={"/users/:userId/playlists/:playlistId"}
					render={props => (
						<Playlist
							{...props}
							selectedSongs={selectedSongs}
							handleSelectSongs={this.handleSelectSongs}
							user={user}
						/>
					)}
				/>
				<Route
					path={"/admin"}
					render={props => <AdminPage user={user} {...props} />}
				/>
			</Fragment>
		);
	}
}

export default App;
