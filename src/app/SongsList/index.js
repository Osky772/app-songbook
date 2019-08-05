import React, { Component, Fragment } from "react";
import Grid from "@material-ui/core/Grid";

import SearchSong from "./components/SearchSong";
import { PageWrapper } from "../containers/StyledContainers";
import SongsListRow from "./components/Row";
import { db } from "../../App";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";
import Loader from "react-loader-spinner";
import styles from './styles';
import Category from './components/Category';
import Buttons from './components/Buttons';
import Title from './components/Title';

const BASE_URL = "https://app-songbook.firebaseio.com";

const getFirstLetter = (song, id, songs, letters) => {
	const songTitle = song.performer ? song.performer : song.title;
	const previousSong = id > 0 ? songs[id - 1] : null;
	const previousSongTitle = previousSong
		? previousSong.performer
			? previousSong.performer
			: previousSong.title
		: null;

	return previousSong
		? songTitle.charAt(0) === previousSongTitle.charAt(0)
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
		fetchInProgress: true
	};

	fetchSongs = () => {
		this.setState({ fetchInProgress: true });
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
				this.setState({ fetchInProgress: false });
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
			if (props.selectedSongs.length === 0) {
				const { checked } = state;
				const unChecked = Object.keys(checked).reduce((acc, next) => {
					return {
						...acc,
						[next]: false
					};
				}, {});

				return {
					...state,
					selectedSongs: [],
					checked: unChecked
				};
			}

			return {
				...state,
				selectedSongs: props.selectedSongs
			};
		}
		return null;
	}

	handleCategorySelect = category => {
		this.setState({ category });
		this.props.toggleDrawer(false);
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

		const checkedSongs = [...this.state.selectedSongs].concat(songs);
		const unique = checkedSongs
			.map(e => e["id"])
			.map((e, i, final) => final.indexOf(e) === i && i)
			.filter(e => checkedSongs[e])
			.map(e => checkedSongs[e]);
		unique.forEach(song => (allChecked[song.id] = true));

		this.setState({
			...this.state,
			checked: allChecked,
			selectedSongs: unique
		});
		this.props.handleSelectSongs(unique);
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
		const {
			songs = [],
			category = "",
			searchText = "",
			checked,
			fetchInProgress
		} = this.state;
		const { classes, isDrawerOpen } = this.props;
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
			.map(title => {
				return title.charAt(0);
			})
			.reduce((acc, next) => {
				return {
					...acc,
					[next]: next
				};
			}, {});

		return (
			<WithWidth>
				{({ width }) => (
					<PageWrapper className={classes.wrapper}>
						<Grid container spacing={width === "xs" || width === "sm" ? 0 : 24}>
							<Category
								width={width}
								isDrawerOpen={isDrawerOpen}
								toggleDrawer={this.props.toggleDrawer}
								handleCategorySelect={this.handleCategorySelect}
								songs={songs}
							/>
							<Grid item md={8} className={classes.contentGrid}>
								<SearchSong 
									handleChangeForm={this.handleChangeForm}
								/>
								<Buttons
									handleSelectAll={this.handleSelectAll}
									handleClearSelectAll={this.handleClearSelectAll}
									songsList={songsList}
								/>
								<Title 
									category={category}
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
								) : !sortedSongs.length && !fetchInProgress ? (
									<Typography variant="h6">Nie znaleziono piosenki</Typography>
								) : (
									sortedSongs.map((song, id, songs) => (
										<Fragment key={id}>
											<Typography variant="h4" style={{ paddingLeft: 10 }}>
												{getFirstLetter(song, id, songs, firstLetters)}
											</Typography>
											<SongsListRow
												key={song.id}
												song={song}
												checked={checked}
												handleCheckboxSelect={this.handleCheckboxSelect}
											/>
										</Fragment>
									))
								)}
							</Grid>
						</Grid>
					</PageWrapper>
				)}
			</WithWidth>
		);
	}
}

export default withStyles(styles)(SongsList);
