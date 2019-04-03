import React, { Component } from "react";
import {
	PageWrapper,
	SongPaper as PlaylistPaper
} from "./containers/StyledContainers";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { formatSongDescription, styles as songStyles } from "./Song";
import CreatePDF from "./CreatePDF";
import Button from "@material-ui/core/Button";
import ModalCreatePlaylist from "./ModalCreatePlaylist/ModalCreatePlaylist";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlist extends Component {
	state = {
		isEditing: false,
		playlist: {}
	};

	getPlaylist = () => {
		const { playlistId } = this.props.match.params;
		fetch(`${BASE_URL}/playlists/${playlistId}.json`)
			.then(r => r.json())
			.then(playlist => {
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

	handleRemovePlaylist = playlistId => {
		fetch(`${BASE_URL}/playlists/${playlistId}.json`, {
			method: "DELETE"
		})
			.then(() => alert("Removed playlist successfully"))
			.then(() => this.props.history.push("/playlisty"));
	};

	render() {
		const {
			isEditing,
			playlist,
			playlist: { title, songs = [] }
		} = this.state;
		const { selectedSongs } = this.props;

		return (
			<PageWrapper>
				{isEditing && (
					<ModalCreatePlaylist
						isEditing={isEditing}
						editedPlaylist={playlist}
						handleClose={this.handleCloseEditMode}
						selectedSongs={selectedSongs}
						fetchData={this.getPlaylist}
					/>
				)}
				<PlaylistPaper>
					<h1>{title}</h1>
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
