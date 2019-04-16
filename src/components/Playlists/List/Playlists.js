import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
	SongsListRow,
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

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlists extends Component {
	state = {
		inputValue: "",
		playlists: [],
		editedPlaylist: {},
		isEditing: false,
		isPublic: true
	};

	getPublicPlaylists = () => {
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
			});
	};

	getPrivatePlaylists = () => {
		const { user } = this.props;
		db.ref(`users/${user.uid}/playlists`)
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
			});
	};

	componentDidMount() {
		this.getPublicPlaylists();
	}

	handleInputChange = e => {
		this.setState({ inputValue: e.target.value });
	};

	handleCategorySelect = category => {
		if (category === "public") {
			this.setState({ isPublic: true });
			this.getPublicPlaylists();
		}
		if (category === "private") {
			this.setState({ isPublic: false });
			this.getPrivatePlaylists();
		}
	};

	render() {
		const { inputValue = "", playlists = [], isPublic } = this.state;
		const { user } = this.props;

		const searchedPlaylists = playlists.filter(playlist => {
			const playlistTitle = playlist.title.toLowerCase();
			const searchText = inputValue.trim().toLowerCase();
			return playlistTitle.includes(searchText);
		});

		return (
			<PageWrapper>
				<Grid container spacing={24}>
					<Grid item md={4}>
						<Paper>
							<List component="nav" style={{ background: "white" }}>
								<ListItem
									button
									onClick={() => this.handleCategorySelect("public")}
								>
									<ListItemText primary={"PUBLICZNE"} />
								</ListItem>
								<ListItem
									button
									onClick={
										user ? () => this.handleCategorySelect("private") : null
									}
								>
									<ListItemText primary={"PRYWATNE"} />
								</ListItem>
							</List>
						</Paper>
					</Grid>
					<Grid item md={8}>
						<ListContainer>
							<SearchForm
								handleChange={this.handleInputChange}
								label="Wyszukaj playlistę"
								placeholder="Wpisz nazwę playlisty"
							/>
							{searchedPlaylists.map(playlist => (
								<PlaylistItem key={playlist.id}>
									<Link
										key={playlist.id}
										to={
											isPublic
												? `/playlisty/${playlist.id}`
												: `users/${user.uid}/playlists/${playlist.id}`
										}
									>
										<h1>{playlist.title}</h1>
										{playlist.songs !== undefined &&
											playlist.songs.map(({ performer, title, id }, nr) => (
												<SongsListRow key={id} elevation={1}>
													<Typography variant="h5" style={{ marginRight: 15 }}>
														{nr + 1}.
													</Typography>
													<div>
														<Typography variant="h5">
															{performer ? performer + " - " + title : title}
														</Typography>
													</div>
												</SongsListRow>
											))}
									</Link>
								</PlaylistItem>
							))}
						</ListContainer>
					</Grid>
				</Grid>
			</PageWrapper>
		);
	}
}

export default Playlists;
