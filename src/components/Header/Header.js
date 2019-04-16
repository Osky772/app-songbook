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
import CreateSong from "../CreateSong/CreateSong";
import CreatePDF from "../SharedComponents/CreatePDF";
import CreatePlaylist from "./CreatePlaylist";
import Sign from "../Sign/Sign";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as firebase from "firebase";
import "typeface-montserrat";
import "../../App.css";

const styles = theme => ({
	AppBar: {
		backgroundColor: theme.palette.primary.main,
		height: 55,
		alignItems: "center"
	},
	firstAppBar: {
		position: "static",
		boxShadow: "none"
	},
	secondAppBar: {
		position: "sticky"
	},
	logoText: {
		letterSpacing: 3,
		fontSize: 22,
		textDecoration: "none",
		fontFamily: "'Montserrat', sans-serif"
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
		fontSize: "14px",
		textTransform: "none",
		fontWeight: "bold",
		padding: "3px 25px",
		marginLeft: 15
	},
	loginBtn: {
		"&:hover": {
			backgroundColor: theme.palette.secondary.dark,
			color: "#ececec"
		}
	},
	registerBtn: {
		backgroundColor: theme.palette.secondary.main,
		"&:hover": {
			backgroundColor: theme.palette.secondary.dark,
			color: "#ececec"
		}
	},
	logoutBtn: {
		"&:hover": {
			backgroundColor: theme.palette.secondary.dark,
			color: "#ececec"
		}
	},
	label: {
		textTransform: "none"
	}
});

class Header extends Component {
	state = {
		value: 0,
		isSignedUp: false,
		isOpen: false
	};

	componentDidMount() {
		if (window.location.pathname === "/lista-piosenek") {
			this.setState({ value: 0 });
		}
		if (window.location.pathname === "/playlisty") {
			this.setState({ value: 1 });
		}
	}

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
							<FaItunesNote style={{ fontSize: "38px", marginRight: "25px" }} />
							<Typography
								component={Link}
								to="/lista-piosenek"
								variant="h6"
								color="inherit"
								className={classes.logoText}
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
										className={classNames(classes.Btn, classes.logoutBtn)}
										onClick={this.logOut}
									>
										Wyloguj się
									</Button>
								</Fragment>
							) : (
								<Fragment>
									<Sign
										isOpen={isOpen}
										isSignedUp={isSignedUp}
										handleClose={this.handleClose}
									/>
									<Button
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
						<Grid item lg={6}>
							<Toolbar variant="dense">
								<Tabs value={value} onChange={this.handleChange}>
									<Tab
										component={Link}
										to="/lista-piosenek"
										label="Lista piosenek"
										classes={{
											label: "logo-text"
										}}
									/>
									<Tab
										component={Link}
										to="/playlisty"
										label="Playlisty"
										classes={{
											label: "logo-text"
										}}
									/>
								</Tabs>
							</Toolbar>
						</Grid>
						<Grid item lg={6} className={classes.flexEnd}>
							<CreateSong />
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
