import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SearchForm from "../../SharedComponents/SearchForm";
import { PageWrapper } from "../../containers/StyledContainers";
import SongRow from "./Row/SongRow";
import Button from "@material-ui/core/Button";
import { db } from "../../../App";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import { MdFilterList } from "react-icons/md";
import Fab from "@material-ui/core/Fab";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";
import Drawer from "@material-ui/core/Drawer";

const BASE_URL = "https://app-songbook.firebaseio.com/";

const styles = theme => ({
	btn: {
		textTransform: "none",
		marginRight: 15
	},
	xs: {
		fontSize: 35,
		position: "fixed",
		width: 50,
		height: 50,
		padding: 0,
		borderRadius: 50,
		bottom: 20,
		right: 270,
		backgroundColor: theme.palette.primary.main,
		color: "white",
		boxShadow: "#464646 1px 2px 4px 0",
		"&:hover": {
			backgroundColor: theme.palette.primary.main,
			color: "white"
		}
	}
});

const getFirstLetter = (song, id, songs, letters) => {
	const songTitle = song.performer ? song.performer : song.title;
	const previousSong = id > 0 ? songs[id - 1] : null;
	const previousSongTitle = previousSong
		? previousSong.performer
			? previousSong.performer
			: previousSong.title
		: null;

	return previousSong
		? songTitle === previousSongTitle
			? null
			: letters[songTitle.charAt(0)]
		: letters[songTitle.charAt(0)];
};

const WithWidth = toRenderProps(withWidth());

class SongsList extends Component {
	state = {
		songs: [],
		category: "",
		searchText: "",
		selectedSongs: [],
		checked: {},
		isDrawerOpen: false
	};

	fetchSongs = () => {
		fetch(`${BASE_URL}/songs.json`)
			.then(r => r.json())
			.then(songs => {
				const arraySongs =
					songs &&
					Object.keys(songs).map(key => ({
						id: key,
						...songs[key]
					}));
				this.setState({ songs: arraySongs || [] });

				const checked = arraySongs.reduce(
					(options, song) => ({
						...options,
						[song.id]: false
					}),
					{}
				);

				const { selectedSongs } = this.props;
				const songsIds = selectedSongs.map(song => song.id);
				const checkedSelectedSongs = songsIds.reduce(
					(acc, next) => ({ ...acc, [next]: true }),
					{}
				);
				this.setState({
					...this.state,
					selectedSongs,
					checked: Object.assign(checked, checkedSelectedSongs)
				});
			});
	};

	componentDidMount() {
		const onValueChange = dataSnapshot => {
			this.fetchSongs();
		};
		db.ref("songs").on("value", onValueChange);
	}

	componentWillUnmount() {
		const onValueChange = dataSnapshot => {
			this.fetchSongs();
		};
		db.ref("songs").off("value", onValueChange);
	}

	static getDerivedStateFromProps(props, state) {
		if (props.selectedSongs.length !== state.selectedSongs.length) {
			const { songs } = state;
			const checked = songs.reduce(
				(options, song) => ({
					...options,
					[song.id]: false
				}),
				{}
			);
			return {
				...state,
				selectedSongs: props.selectedSongs,
				checked
			};
		}
		return null;
	}

	handleCategorySelect = category => {
		this.setState({ category });
	};

	handleChangeForm = e => {
		this.setState({ searchText: e.target.value.toLowerCase() });
	};

	handleCheckboxSelect = e => {
		const { name } = e.target;
		const checkedSong = this.state.songs.find(song => song.id === name);

		if (this.state.checked[name] === false) {
			const selectedSongs = [...this.state.selectedSongs, checkedSong];
			this.setState(prevState => ({
				checked: {
					...prevState.checked,
					[name]: !prevState.checked[name]
				},
				selectedSongs
			}));
			this.props.handleSelectSongs(selectedSongs);
		} else {
			const selectedSongs = [...this.state.selectedSongs, checkedSong].filter(
				song => song.id !== checkedSong.id
			);
			this.setState(prevState => ({
				checked: {
					...prevState.checked,
					[name]: !prevState.checked[name]
				},
				selectedSongs
			}));
			this.props.handleSelectSongs(selectedSongs);
		}
	};

	handleSelectAll = songs => {
		const { checked } = this.state;
		const allChecked = Object.keys(checked).reduce((acc, next) => {
			return {
				...acc,
				[next]: false
			};
		}, {});
		songs.forEach(song => (allChecked[song.id] = true));

		this.setState({
			...this.state,
			checked: allChecked,
			selectedSongs: songs
		});
		this.props.handleSelectSongs(songs);
	};

	handleClearSelectAll = () => {
		const { checked } = this.state;
		const unChecked = Object.keys(checked).reduce((acc, next) => {
			return {
				...acc,
				[next]: false
			};
		}, {});
		this.setState({ checked: unChecked, selectedSongs: [] });
		this.props.handleSelectSongs([]);
	};

	toggleDrawer = open => {
		this.setState({ ...this.state, isDrawerOpen: open });
	};

	render() {
		const { songs = [], category = "", searchText = "", checked } = this.state;
		const { classes } = this.props;
		let songsList = category
			? songs.filter(song => song.category === category)
			: songs;
		songsList = searchText
			? songsList.filter(song => {
					const songTitle =
						song.performer.toLowerCase() + song.title.toLowerCase();
					return songTitle.includes(searchText);
			  })
			: songsList;
		const sortedSongs = songsList.sort((a, b) => {
			const phraseA = a.performer + a.title;
			const phraseB = b.performer + b.title;
			return phraseA.localeCompare(phraseB);
		});

		const firstLetters = [
			...new Set(
				sortedSongs.map(song => {
					const songTitle = song.performer ? song.performer : song.title;
					return songTitle;
				})
			)
		]
			.map(performer => performer.charAt(0))
			.reduce((acc, next) => {
				return {
					...acc,
					[next]: next
				};
			}, {});

		const uniqueCategories = [...new Set(songs.map(song => song.category))];
		const categories = uniqueCategories.map(category => {
			return (
				<ListItem
					button
					onClick={() => this.handleCategorySelect(category)}
					key={category}
				>
					<ListItemText primary={category} />
				</ListItem>
			);
		});

		return (
			<WithWidth>
				{({ width }) => (
					<PageWrapper>
						<Grid container spacing={24}>
							<Grid item md={4}>
								{width === "xs" ? (
									<Fragment>
										<Fab
											className={classes.xs}
											onClick={() => this.toggleDrawer(true)}
										>
											<MdFilterList />
										</Fab>
										<Drawer
											open={this.state.isDrawerOpen}
											onClose={() => this.toggleDrawer(false)}
										>
											<div
											// role="button"
											// onClick={() => this.toggleDrawer(false)}
											// onKeyDown={() => this.toggleDrawer(false)}
											>
												<ListItem
													button
													onClick={() => this.handleCategorySelect("")}
												>
													<ListItemText primary={"wszystkie"} />
												</ListItem>
												{categories}
											</div>
										</Drawer>
									</Fragment>
								) : (
									<Paper>
										<List component="nav" style={{ background: "white" }}>
											{
												<ListItem
													button
													onClick={() => this.handleCategorySelect("")}
												>
													<ListItemText primary={"wszystkie"} />
												</ListItem>
											}
											{categories}
										</List>
									</Paper>
								)}
							</Grid>
							<Grid item md={8}>
								<Button
									onClick={() => this.handleSelectAll(songsList)}
									variant="outlined"
									className={classes.btn}
								>
									Zaznacz wszystkie
								</Button>
								<Button
									onClick={this.handleClearSelectAll}
									variant="outlined"
									className={classes.btn}
								>
									Wyczyść
								</Button>
								<div
									style={{
										width: "100%",
										margin: "5px 0 15px 0"
									}}
								>
									<SearchForm
										handleChange={this.handleChangeForm}
										placeholder="Wpisz nazwę artysty lub tytuł piosenki..."
										label="Wyszukaj piosenkę"
									/>
								</div>
								{sortedSongs.map((song, id, songs) => (
									<Fragment key={id}>
										<Typography variant="h4" style={{ paddingLeft: 10 }}>
											{getFirstLetter(song, id, songs, firstLetters)}
										</Typography>
										<SongRow
											key={song.id}
											song={song}
											checked={checked}
											handleCheckboxSelect={this.handleCheckboxSelect}
										/>
									</Fragment>
								))}
							</Grid>
						</Grid>
					</PageWrapper>
				)}
			</WithWidth>
		);
	}
}

export default withStyles(styles)(SongsList);
