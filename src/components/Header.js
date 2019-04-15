import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { FaItunesNote } from "react-icons/fa";
import CreateSongModal from "./CreateSongModal/CreateSongModal";
import CreatePDF from "./CreatePDF";
import CreatePlaylist from "./Playlists/CreatePlaylist";
import SignModal from "./Sign/SignModal";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as firebase from "firebase";

const styles = theme => ({
	AppBar: {
		backgroundColor: theme.palette.primary.main,
		height: 48,
		alignItems: "center"
	},
	firstAppBar: {
		position: "static",
		boxShadow: "none"
	},
	secondAppBar: {
		position: "sticky"
	},
	Toolbar: {
		// padding: "5px 10px 0 10px"
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
		height: "100%",
		maxWidth: 1030,
		margin: "0 auto",
		alignItems: "center",
		justifyContent: "space-between"
	},
	Btn: {
		color: "white",
		fontSize: "13px",
		fontWeight: "bold",
		marginLeft: 15
	},
	loginBtn: {
		borderColor: theme.palette.secondary.main,
		color: "white",
		fontSize: "13px",
		fontWeight: "bold",
		"&:hover": {
			backgroundColor: theme.palette.secondary.light,
			borderColor: theme.palette.secondary.light
		}
	},
	registerBtn: {
		backgroundColor: theme.palette.secondary.main,
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
				<AppBar className={classNames(classes.AppBar, classes.firstAppBar)}>
					<Grid container className={classes.maxWidth}>
						<Grid item lg={4} className={classes.flexContainer}>
							<FaItunesNote style={{ fontSize: "40px", marginRight: "25px" }} />
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
									<Typography variant="subtitle2" style={{ color: "white" }}>
										Użytkownik:
										<span style={{ fontWeight: "bold" }}> {user.email}</span>
									</Typography>

									<Button
										variant="outlined"
										className={classes.Btn}
										onClick={this.logOut}
									>
										Wyloguj się
									</Button>
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
										className={classNames(classes.Btn, classes.loginBtn)}
										onClick={this.handleSignInOpen}
									>
										Zaloguj się
									</Button>
									<Button
										variant="contained"
										className={classNames(classes.Btn, classes.registerBtn)}
										onClick={this.handleSignUpOpen}
									>
										Zarejestruj się
									</Button>
								</Fragment>
							)}
						</Grid>
					</Grid>
				</AppBar>
				<AppBar className={classNames(classes.AppBar, classes.secondAppBar)}>
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
							<CreateSongModal />
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
