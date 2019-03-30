import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PageWrapper from "./containers/PageWrapper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SearchForm from "./SearchForm";
import Checkbox from "@material-ui/core/Checkbox";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { SongsListRow } from "./containers/StyledContainers";

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
				this.setState({ checked });
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
			<Fragment>
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
							<SearchForm handleChange={this.handleChangeForm} />
							{songsList.map(({ id, performer, title, category }) => (
								<SongsListRow key={id} elevation={1}>
									<Checkbox
										name={id}
										color="primary"
										icon={<MdCheckBoxOutlineBlank fontSize="big" />}
										checkedIcon={<MdCheckBox fontSize="big" />}
										checked={checked[id] ? checked[id] : false}
										onChange={this.handleCheckboxSelect}
									/>
									<Link to={`/lista-piosenek/${id}`}>
										<Typography variant="h5" component="h3">
											{performer ? performer + " - " + title : title}
										</Typography>
										<Typography variant="h6" component="h6">
											{" " + category}
										</Typography>
									</Link>
								</SongsListRow>
							))}
						</Grid>
					</Grid>
				</PageWrapper>
			</Fragment>
		);
	}
}

export default SongsList;
