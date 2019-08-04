import React, { Component, Fragment } from "react";
import Header from "./app/Header/Header";
import Playlists from "./app/Playlists/List/Playlists";
import SongsList from "./app/SongsList";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Route } from "react-router-dom";
import Song from "./app/Song/Song";
import Initial from "./app/Initial";
import Playlist from "./app/Playlist/Playlist";
import * as firebase from "firebase";
import AdminPage from "./app/Admin/AdminPage";

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
		isAdmin: false,
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
			db.ref("admins")
				.once("value")
				.then(snapshot => {
					if (snapshot.val()) {
						console.log("admin logged");
						this.handleAdmin(true);
					}
				})
				.catch(() => {
					return;
				});
		});

		this.setState({
			ref
		});
	}

	componentWillUnmount() {
		this.state.ref && this.state.ref();
	}

	handleAdmin = val => {
		this.setState({ isAdmin: val });
	};

	render() {
		const { selectedSongs, user, isDrawerOpen, isAdmin } = this.state;
		return (
			<Fragment>
				<CssBaseline />
				<Route
					path="/"
					render={props => (
						<Header
							{...props}
							selectedSongs={selectedSongs}
							handleSelectSongs={this.handleSelectSongs}
							user={user}
							toggleDrawer={this.toggleDrawer}
							handleAdmin={this.handleAdmin}
							isAdmin={isAdmin}
						/>
					)}
				/>
				<Route exact path="" render={props => <Initial {...props} />} />
				<Route exact path={"/lista-piosenek/:songId"} component={Song} />
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
					exact
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
					exact
					path={"/users/:userId/playlists/:playlistId"}
					render={props => (
						<Playlist
							selectedSongs={selectedSongs}
							handleSelectSongs={this.handleSelectSongs}
							user={user}
							{...props}
						/>
					)}
				/>
				<Route
					exact
					path={"/admin"}
					render={props => <AdminPage user={user} {...props} />}
				/>
			</Fragment>
		);
	}
}

export default App;
