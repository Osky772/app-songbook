import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SearchForm from "../SearchForm";
import { PageWrapper } from "../containers/StyledContainers";
import SongElement from "./SongElement";
import Button from "@material-ui/core/Button";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class SongsList extends Component {
	state = {
		songs: [],
		category: "",
		searchText: "",
		selectedSongs: [],
		checked: {}
	};

	componentWillMount() {
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
				[next]: true
			};
		}, {});

		this.setState({
			...this.state,
			checked: allChecked,
			selectedSongs: songs
		});
		this.props.handleSelectSongs(songs);
	};

	render() {
		const { songs, category, searchText, checked } = this.state;
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
										<ListItemText primary={"WSZYSTKIE"} />
									</ListItem>
								}
								{uniqueCategories.map(category => {
									return (
										<ListItem
											button
											onClick={() => this.handleCategorySelect(category)}
											key={category}
										>
											<ListItemText primary={category.toUpperCase()} />
										</ListItem>
									);
								})}
							</List>
						</Paper>
					</Grid>
					<Grid item md={8}>
						<SearchForm
							style={{ width: "80%" }}
							handleChange={this.handleChangeForm}
							placeholder="Wpisz nazwę artysty lub tytuł piosenki..."
							label="Wyszukaj piosenkę"
						/>
						<Button onClick={() => this.handleSelectAll(songsList)}>
							Zaznacz wszystkie
						</Button>
						<Button>Wyczyść</Button>
						{songsList.map(song => (
							<SongElement
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

export default SongsList;
