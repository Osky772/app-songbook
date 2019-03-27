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

const BASE_URL = "https://app-songbook.firebaseio.com/";

const styles = {
	paper: {
		padding: "15px 20px",
		margin: "0px 10px 15px 10px",
		borderRadius: 0
	}
};

class SongsList extends Component {
	state = {
		songs: [],
		category: "",
		searchText: ""
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
			});
	}

	handleCategorySelect = category => {
		this.setState({ category });
	};

	handleChangeForm = e => {
		this.setState({ searchText: e.target.value });
	};

	render() {
		const { songs, category, searchText } = this.state;

		let songsList = category
			? songs.filter(song => song.category === category)
			: songs;

		songsList = searchText
			? songsList.filter(song => {
					const songTitle = song.performer + song.title;
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
								<Link key={id} to={`/lista-piosenek/${id}`}>
									<Paper elevation={1} style={styles.paper}>
										<Typography variant="h5" component="h3">
											{performer + " - " + title}
										</Typography>
										<Typography variant="h6" component="h6">
											{" " + category}
										</Typography>
									</Paper>
								</Link>
							))}
						</Grid>
					</Grid>
				</PageWrapper>
			</Fragment>
		);
	}
}

export default SongsList;
