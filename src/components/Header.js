import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { GiSpellBook } from "react-icons/gi";
import ModalCreateSong from "./CreateSongModal/CreateSongModal";
import CreatePDF from "./CreatePDF";
import CreatePlaylist from "./Playlists/CreatePlaylist";
import SignModal from "./Sign/SignModal";
import * as firebase from "firebase";

const styles = {
	firstAppBar: {
		position: "static",
		boxShadow: "none"
	},
	secondAppBar: {
		position: "sticky"
	},
	Toolbar: {
		padding: "5px 10px 0 10px"
	},
	flexContainer: {
		display: "flex",
		alignItems: "center"
	},
	flexEnd: {
		display: "flex",
		justifyContent: "flex-end"
	},
	maxWidth: {
		maxWidth: 1030,
		margin: "0 auto",
		alignItems: "center",
		justifyContent: "space-between"
	}
};

class Header extends Component {
	state = {
		value: 0,
		isSignedUp: false,
		isOpen: false
	};

	handleChange = (e, value) => {
		this.setState({ value });
	};

	handleSignInOpen = () => {
		this.setState({ isOpen: true, isSignedUp: false });
	};

	handleSignUpOpen = () => {
		this.setState({ isOpen: true, isSignedUp: true });
	};

	handleOpen = () => {
		this.setState({ isOpen: true });
	};

	handleClose = () => {
		this.setState({ isOpen: false });
	};

	logOut = () => {
		firebase.auth().signOut();
	};

	render() {
		const { value, isSignedUp, isOpen } = this.state;
		const {
			user,
			selectedSongs,
			editedPlaylist,
			handleSelectSongs
		} = this.props;

		return (
			<Fragment>
				<AppBar style={styles.firstAppBar} color="primary">
					<Grid container style={styles.maxWidth}>
						<Grid item lg={4} style={styles.flexContainer}>
							<GiSpellBook style={{ fontSize: "55px", marginRight: "25px" }} />
							<Typography
								component={Link}
								to="/lista-piosenek"
								variant="h6"
								color="inherit"
								style={{ textDecoration: "none" }}
							>
								Śpiewnik
							</Typography>
						</Grid>
						<Grid item lg={8} style={styles.flexEnd}>
							{user ? (
								<Button onClick={this.logOut}>Wyloguj się</Button>
							) : (
								<Fragment>
									<SignModal
										isOpen={isOpen}
										isSignedUp={isSignedUp}
										handleClose={this.handleClose}
									/>
									<Button onClick={this.handleSignInOpen}>Zaloguj się</Button>
									<Button onClick={this.handleSignUpOpen}>
										Zarejestruj się
									</Button>
								</Fragment>
							)}
						</Grid>
					</Grid>
				</AppBar>
				<AppBar style={styles.secondAppBar} color="primary">
					<Grid container style={styles.maxWidth}>
						<Grid item lg={4}>
							<Toolbar variant="dense" style={styles.Toolbar}>
								<Tabs value={value} onChange={this.handleChange}>
									<Tab
										component={Link}
										to="/lista-piosenek"
										label="Lista piosenek"
									/>
									<Tab component={Link} to="/playlisty" label="Playlisty" />
								</Tabs>
							</Toolbar>
						</Grid>
						<Grid item lg={8} style={styles.flexEnd}>
							<ModalCreateSong />
							<CreatePlaylist
								editedPlaylist={editedPlaylist}
								selectedSongs={selectedSongs}
								handleSelectSongs={handleSelectSongs}
							/>
							<CreatePDF songs={selectedSongs} />
						</Grid>
					</Grid>
				</AppBar>
			</Fragment>
		);
	}
}

export default Header;
