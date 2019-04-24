import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import { FaItunesNote } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import CreateSong from "../CreateSong/CreateSong";
import CreatePDF from "../SharedComponents/CreatePDF";
import CreatePlaylist from "./CreatePlaylist";
import Sign from "../Sign/Sign";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import * as firebase from "firebase";
import "typeface-montserrat";
import "../../App.css";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";

const WithWidth = toRenderProps(withWidth());

const styles = theme => ({
	AppBar: {
		backgroundColor: theme.palette.primary.main,
		height: 55,
		alignItems: "center"
	},
	firstAppBar: {
		position: "static",
		boxShadow: "none",
		[theme.breakpoints.down("xs")]: {
			height: 95,
			display: "flex",
			flexDirection: "column"
		}
	},
	secondAppBar: {
		position: "sticky",
		top: 0,
		zIndex: 9500
	},
	logoIcon: {
		fontSize: "38px",
		color: "white",
		marginRight: "25px",
		[theme.breakpoints.down("xs")]: {
			marginRight: 5
		}
	},
	logoText: {
		letterSpacing: 3,
		fontSize: 22,
		textDecoration: "none",
		color: "white",
		fontFamily: "'Montserrat', sans-serif"
	},
	logoContainer: {
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			justifyContent: "flex-start"
		}
	},
	userContainer: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			justifyContent: "flex-end"
		}
	},
	maxWidth: {
		height: "100%",
		maxWidth: 1030,
		margin: "0 auto",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		[theme.breakpoints.down("xs")]: {
			flexDirection: "column",
			justifyContent: "space-around",
			margin: 0,
			width: "100%"
		}
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
		},
		[theme.breakpoints.down("xs")]: {
			padding: 0
		}
	},
	label: {
		textTransform: "none"
	},
	toolBarGrid: {
		[theme.breakpoints.down("xs")]: {
			alignSelf: "flex-start"
		}
	},
	filterBtn: {
		fontSize: 35,
		width: 50,
		height: 50,
		padding: 0,
		borderRadius: 50,
		zIndex: 4000,
		backgroundColor: theme.palette.primary.main,
		color: "white",
		boxShadow: "#464646 1px 2px 4px 0",
		"&:disabled": {
			backgroundColor: "#c5c5c5",
			color: "white",
			boxShadow: "#464646 1px 2px 4px 0"
		},
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			color: "white"
		}
	},
	mobileDeviceButtonsContainer: {
		position: "fixed",
		bottom: 45,
		right: "50%",
		transform: "translate(50%, 0%)",
		width: 250,
		display: "flex",
		justifyContent: "space-evenly"
	}
});

class Header extends Component {
	state = {
		value: 0,
		signUp: false,
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
		this.setState({ isOpen: true, signUp: false });
		const body = document.querySelector("body");
		body.classList.add("not-scrollable");
	};

	handleSignUpOpen = () => {
		this.setState({ isOpen: true, signUp: true });
		const body = document.querySelector("body");
		body.classList.add("not-scrollable");
	};

	handleClose = () => {
		this.setState({ isOpen: false });
		const body = document.querySelector("body");
		body.classList.remove("not-scrollable");
	};

	logOut = () => {
		firebase.auth().signOut();
	};

	render() {
		const { value, signUp, isOpen } = this.state;
		const {
			classes,
			user,
			selectedSongs,
			editedPlaylist,
			handleSelectSongs
		} = this.props;
		return (
			<WithWidth>
				{({ width }) => (
					<Fragment>
						<div className={classNames(classes.AppBar, classes.firstAppBar)}>
							<div className={classes.maxWidth}>
								<div className={classes.logoContainer}>
									<FaItunesNote className={classes.logoIcon} />
									<Typography
										component={Link}
										to="/lista-piosenek"
										variant="h6"
										color="inherit"
										className={classes.logoText}
									>
										Śpiewnik
									</Typography>
								</div>
								<div className={classes.userContainer}>
									{user ? (
										<Fragment>
											<Typography
												variant="subtitle2"
												style={{ color: "white" }}
											>
												Użytkownik:
												<span style={{ fontWeight: "bold" }}>
													{" "}
													{user.email}
												</span>
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
												signUp={signUp}
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
								</div>
							</div>
						</div>
						<div className={classNames(classes.AppBar, classes.secondAppBar)}>
							<Grid container className={classes.maxWidth}>
								<Grid item lg={6} className={classes.toolBarGrid}>
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
								<Grid item md={6} sm={6} xs={12} className={classes.flexEnd}>
									{width === "xs" || width === "sm" ? (
										<div className={classes.mobileDeviceButtonsContainer}>
											<Fab
												className={classes.filterBtn}
												onClick={() => this.props.toggleDrawer(true)}
												disabled={
													window.location.pathname !== "/lista-piosenek"
												}
											>
												<MdFilterList />
											</Fab>
											<CreateSong />
											{user ? (
												<CreatePlaylist
													editedPlaylist={editedPlaylist}
													selectedSongs={selectedSongs}
													handleSelectSongs={handleSelectSongs}
													user={user}
												/>
											) : null}
											<CreatePDF isButton songs={selectedSongs} />
										</div>
									) : (
										<Fragment>
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
										</Fragment>
									)}
								</Grid>
							</Grid>
						</div>
					</Fragment>
				)}
			</WithWidth>
		);
	}
}

export default withStyles(styles)(Header);
