import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { GiSpellBook, GiWhiteBook } from "react-icons/gi";
import ModalCreateSong from "./CreateSongModal/CreateSongModal";
import CreatePDF from "./CreatePDF";
import CreatePlaylist from "./Playlists/CreatePlaylist";
import SignModal from "./Sign/SignModal";
import { withStyles } from "@material-ui/core/styles";
import * as firebase from "firebase";

const styles = theme => ({
	firstAppBar: {
		position: "static",
		boxShadow: "none",
		backgroundColor: theme.palette.primary.main
	},
	secondAppBar: {
		position: "sticky",
		backgroundColor: theme.palette.primary.main
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
		justifyContent: "flex-end",
		alignItems: "center"
	},
	maxWidth: {
		maxWidth: 1030,
		margin: "0 auto",
		alignItems: "center",
		justifyContent: "space-between"
	},
	loginBtn: {
		borderColor: theme.palette.secondary.main,
		color: "white",
		fontSize: "13px",
		fontWeight: "bold",
		margin: "0 15px",
		"&:hover": {
			backgroundColor: theme.palette.secondary.light,
			borderColor: theme.palette.secondary.light
		}
	},
	registerBtn: {
		backgroundColor: theme.palette.secondary.main,
		color: "white",
		fontWeight: "bold",
		fontSize: "13px",
		"&:hover": {
			backgroundColor: theme.palette.secondary.dark,
			color: "#ececec"
		}
	}
});

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

	handleClose = () => {
		this.setState({ isOpen: false });
	};

	logOut = () => {
		firebase.auth().signOut();
	};

	render() {
		const { value, isSignedUp, isOpen } = this.state;
		const {
			classes,
			user,
			selectedSongs,
			editedPlaylist,
			handleSelectSongs
		} = this.props;

		return (
			<Fragment>
				<AppBar className={classes.firstAppBar}>
					<Grid container className={classes.maxWidth}>
						<Grid item lg={4} className={classes.flexContainer}>
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
						<Grid item lg={8} className={classes.flexEnd}>
							{user ? (
								<Fragment>
									{user.email}
									<Button onClick={this.logOut}>Wyloguj się</Button>
								</Fragment>
							) : (
								<Fragment>
									<SignModal
										isOpen={isOpen}
										isSignedUp={isSignedUp}
										handleClose={this.handleClose}
									/>
									<Button
										variant="outlined"
										className={classes.loginBtn}
										onClick={this.handleSignInOpen}
									>
										Zaloguj się
									</Button>
									<Button
										variant="contained"
										className={classes.registerBtn}
										onClick={this.handleSignUpOpen}
									>
										Zarejestruj się
									</Button>
								</Fragment>
							)}
						</Grid>
					</Grid>
				</AppBar>
				<AppBar className={classes.secondAppBar} color="primary">
					<Grid container className={classes.maxWidth}>
						<Grid item lg={4}>
							<Toolbar variant="dense" className={classes.Toolbar}>
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
						<Grid item lg={8} className={classes.flexEnd}>
							<ModalCreateSong />
							{user ? (
								<CreatePlaylist
									editedPlaylist={editedPlaylist}
									selectedSongs={selectedSongs}
									handleSelectSongs={handleSelectSongs}
									user={user}
								/>
							) : null}
							<CreatePDF songs={selectedSongs} />
						</Grid>
					</Grid>
				</AppBar>
			</Fragment>
		);
	}
}

export default withStyles(styles)(Header);
