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

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlist extends Component {
	state = {
		playlist: {}
	};

	componentDidMount() {
		const { playlistId } = this.props.match.params;
		fetch(`${BASE_URL}/playlists/${playlistId}.json`)
			.then(r => r.json())
			.then(playlist => {
				this.setState({ playlist });
			});
	}

	render() {
		const { title, songs = [] } = this.state.playlist;
		return (
			<PageWrapper>
				<PlaylistPaper>
					<h1>{title}</h1>
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
