import React, { Component } from "react";
import {
	PageWrapper,
	SongPaper as PlaylistPaper
} from "../containers/StyledContainers";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formatSongDescription, styles as songStyles } from "../Song";
import CreatePDF from "../CreatePDF";
import Button from "@material-ui/core/Button";
import PlaylistModal from "./PlaylistModal";
import { db } from "../../App";

class Playlist extends Component {
	state = {
		isEditing: false,
		playlist: {}
	};

	getPlaylist = () => {
		const { userId, playlistId } = this.props.match.params;
		if (userId) {
			db.ref(`users/${userId}/playlists/${playlistId}`)
				.once("value")
				.then(snapshot => {
					const playlist = snapshot.val();
					this.setState({
						playlist: {
							...playlist,
							id: playlistId
						}
					});
				});
			return;
		}

		db.ref(`playlists/${playlistId}`)
			.once("value")
			.then(snapshot => {
				const playlist = snapshot.val();
				this.setState({
					playlist: {
						...playlist,
						id: playlistId
					}
				});
			});
	};

	componentDidMount() {
		this.getPlaylist();
	}

	handleEditPlaylist = () => {
		this.setState({ isEditing: true });
	};

	handleCloseEditMode = () => {
		this.setState({ isEditing: false });
	};

	handleRemovePlaylist = id => {
		const { userId, playlistId } = this.props.match.params;

		if (userId) {
			db.ref(`users/${userId}/playlists/${playlistId}`)
				.remove()
				.then(() => alert("Removed playlist successfully"))
				.then(() => this.props.history.push("/playlisty"))
				.catch(error => alert(error.message));

			return;
		}

		db.ref(`playlists/${id}`)
			.remove()
			.then(() => alert("Removed playlist successfully"))
			.then(() => this.props.history.push("/playlisty"))
			.catch(error => alert(error.message));
	};

	render() {
		const {
			isEditing,
			playlist,
			playlist: { title, songs = [] }
		} = this.state;
		const { selectedSongs, handleSelectSongs, user } = this.props;

		return (
			<PageWrapper>
				{isEditing && (
					<PlaylistModal
						isEditing={isEditing}
						editedPlaylist={playlist}
						handleClose={this.handleCloseEditMode}
						selectedSongs={selectedSongs}
						handleSelectSongs={handleSelectSongs}
						fetchData={this.getPlaylist}
						user={user}
					/>
				)}
				<PlaylistPaper>
					<h1>{title}</h1>
					<p>Stworzone przez: {playlist.userEmail}</p>
					<Button onClick={() => this.handleEditPlaylist(playlist)}>
						Edytuj
					</Button>
					<Button onClick={() => this.handleRemovePlaylist(playlist.id)}>
						Usuń
					</Button>
					<CreatePDF title={title} songs={songs} />
					{songs.map(song => (
						<ExpansionPanel key={song.id}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>{song.title}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails style={{ display: "block" }}>
								{formatSongDescription(song).map((verse, i) => {
									return verse.text !== null ? (
										<p key={i} style={songStyles.verse}>
											<span style={songStyles.text}>{verse.text}</span>
											<span style={songStyles.chords}>
												{verse.chords ? verse.chords : null}
											</span>
										</p>
									) : (
										<br key={i} />
									);
								})}
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</PlaylistPaper>
			</PageWrapper>
		);
	}
}

export default Playlist;
