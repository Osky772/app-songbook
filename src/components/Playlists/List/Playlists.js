import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
	PlaylistItem,
	ListContainer,
	PageWrapper
} from "../../containers/StyledContainers";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import SearchForm from "../../SharedComponents/SearchForm";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { db } from "../../../App";
import { withStyles } from "@material-ui/core/styles";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";
import Loader from "react-loader-spinner";

const WithWidth = toRenderProps(withWidth());

const BASE_URL = "https://app-songbook.firebaseio.com/";

const styles = theme => ({
	wrapper: {
		[theme.breakpoints.down("xs")]: {
			paddingTop: 0,
			paddingBottom: "100px"
		}
	},
	playlistsContainer: {
		padding: 10
	},
	playlistTitle: {
		fontSize: 18,
		padding: "15px 15px 5px 15px"
	},
	playlistDescription: {
		padding: "0px 15px 15px 15px"
	},
	link: {
		textDecoration: "none"
	},
	categoriesContainer: {
		[theme.breakpoints.down("xs")]: {
			margin: 10
		},
		[theme.breakpoints.down("sm")]: {
			margin: 10
		}
	},
	categoryTitle: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 15
	},
	spinnerWrapper: {
		display: "flex",
		justifyContent: "center"
	}
});

class Playlists extends Component {
	state = {
		inputValue: "",
		playlists: [],
		editedPlaylist: {},
		isEditing: false,
		isPublic: true,
		category: "public",
		fetchInProgress: null
	};

	getPublicPlaylists = () => {
		this.setState({ fetchInProgress: true });
		fetch(`${BASE_URL}/playlists.json`)
			.then(r => r.json())
			.then(playlists => {
				const arrayPlaylists =
					playlists &&
					Object.keys(playlists).map(key => ({
						id: key,
						...playlists[key]
					}));
				this.setState({ playlists: arrayPlaylists || [] });
				this.setState({ fetchInProgress: false });
			});
	};

	getPrivatePlaylists = () => {
		const { user } = this.props;
		if (user) {
			this.setState({ fetchInProgress: true });
			db.ref(`users/${user.uid}/playlists/`)
				.once("value")
				.then(snapshot => {
					const playlists = snapshot.val();
					const arrayPlaylists =
						playlists &&
						Object.keys(playlists).map(key => ({
							id: key,
							...playlists[key]
						}));
					const privatePlaylists = arrayPlaylists
						? arrayPlaylists.filter(playlist => playlist.isPublic === false)
						: [];
					this.setState({ playlists: privatePlaylists || [] });
					this.setState({ fetchInProgress: false });
				});
		}
	};

	getUsersPlaylists = () => {
		const { user } = this.props;
		if (user) {
			this.setState({ fetchInProgress: true });
			db.ref(`users/${user.uid}/playlists/`)
				.once("value")
				.then(snapshot => {
					const playlists = snapshot.val();
					const arrayPlaylists =
						playlists &&
						Object.keys(playlists).map(key => ({
							id: key,
							...playlists[key]
						}));
					this.setState({ playlists: arrayPlaylists || [] });
					this.setState({ fetchInProgress: false });
				});
		}
	};

	componentDidMount() {
		this.getPublicPlaylists();
	}

	handleInputChange = e => {
		this.setState({ inputValue: e.target.value });
	};

	handleCategorySelect = category => {
		if (category === "public") {
			this.setState({ category, isPublic: true });
			this.getPublicPlaylists();
		}
		if (category === "private") {
			this.setState({ category, isPublic: false });
			this.getPrivatePlaylists();
		}
		if (category === "yours") {
			this.setState({ category });
			this.getUsersPlaylists();
		}
	};

	render() {
		const {
			inputValue = "",
			playlists = [],
			category,
			isPublic,
			fetchInProgress
		} = this.state;
		const { classes, user } = this.props;
		const searchedPlaylists = playlists.filter(playlist => {
			const playlistTitle = playlist.title.toLowerCase();
			const searchText = inputValue.trim().toLowerCase();
			return playlistTitle.includes(searchText);
		});

		const title = () => {
			if (category === "yours") {
				return "Twoje utworzone playlisty";
			}
			if (category === "public") {
				return "Publiczne playlisty";
			}
			if (category === "private") {
				return "Prywatne playlisty";
			}
		};

		return (
			<WithWidth>
				{({ width }) => (
					<PageWrapper className={classes.wrapper}>
						<Grid container spacing={width === "sm" || width === "xs" ? 0 : 24}>
							<Grid item md={4} xs={12}>
								<Paper className={classes.categoriesContainer}>
									<List component="nav" style={{ background: "white" }}>
										<ListItem
											button
											onClick={() => this.handleCategorySelect("public")}
										>
											<ListItemText primary={"publiczne"} />
										</ListItem>
										{user && (
											<Fragment>
												<ListItem
													button
													onClick={
														user
															? () => this.handleCategorySelect("private")
															: null
													}
												>
													<ListItemText primary={"prywatne"} />
												</ListItem>
												<ListItem
													button
													onClick={() => this.handleCategorySelect("yours")}
												>
													<ListItemText primary={"twoje"} />
												</ListItem>
											</Fragment>
										)}
									</List>
								</Paper>
							</Grid>
							<Grid item md={8} xs={12}>
								<ListContainer className={classes.playlistsContainer}>
									<Typography className={classes.categoryTitle}>
										{title()}
									</Typography>
									<SearchForm
										handleChange={this.handleInputChange}
										label="Wyszukaj playlistę"
										placeholder="Wpisz nazwę playlisty"
									/>
									{fetchInProgress ? (
										<div className={classes.spinnerWrapper}>
											<Loader
												type="Oval"
												color="#039be5"
												width={120}
												height={120}
											/>
										</div>
									) : (
										searchedPlaylists.map(playlist => (
											<PlaylistItem key={playlist.id}>
												<Link
													key={playlist.id}
													to={
														isPublic
															? `/playlisty/${playlist.id}`
															: `users/${user.uid}/playlists/${playlist.id}`
													}
													className={classes.link}
												>
													<Typography className={classes.playlistTitle}>
														{playlist.title}
													</Typography>
													<Typography className={classes.playlistDescription}>
														{playlist.songs !== undefined &&
															playlist.songs.map(
																({ performer, title, id }, nr, songs) => {
																	if (nr < 4) {
																		return nr < songs.length - 1 ? (
																			<span key={id}>
																				{performer
																					? performer + " - " + title
																					: title}
																				{", "}
																			</span>
																		) : (
																			<span key={id}>
																				{performer
																					? performer + " - " + title
																					: title}
																			</span>
																		);
																	}
																	if (nr === 10) {
																		return " ... ";
																	}

																	return null;
																}
															)}
													</Typography>
												</Link>
											</PlaylistItem>
										))
									)}
								</ListContainer>
							</Grid>
						</Grid>
					</PageWrapper>
				)}
			</WithWidth>
		);
	}
}

export default withStyles(styles)(Playlists);
