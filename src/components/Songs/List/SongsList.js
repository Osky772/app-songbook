import React, { Component } from "react";
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

const BASE_URL = "https://app-songbook.firebaseio.com/";

const styles = {
	btn: {
		textTransform: "none",
		marginRight: 15
	}
};

class SongsList extends Component {
	state = {
		songs: [],
		category: "",
		searchText: "",
		selectedSongs: [],
		checked: {}
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
		const uniqueCategories = [...new Set(songs.map(song => song.category))];

		return (
			<PageWrapper>
				<Grid container spacing={24}>
					<Grid item md={4}>
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
								{uniqueCategories.map(category => {
									return (
										<ListItem
											button
											onClick={() => this.handleCategorySelect(category)}
											key={category}
										>
											<ListItemText primary={category} />
										</ListItem>
									);
								})}
							</List>
						</Paper>
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
						{sortedSongs.map(song => (
							<SongRow
								key={song.id}
								song={song}
								checked={checked}
								handleCheckboxSelect={this.handleCheckboxSelect}
							/>
						))}
					</Grid>
				</Grid>
			</PageWrapper>
		);
	}
}

export default withStyles(styles)(SongsList);
