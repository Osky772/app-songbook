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

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlist extends Component {
	state = {
		playlist: {}
	};

	componentDidMount() {
		const { playlistId } = this.props.match.params;
		console.log(playlistId);
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
					{songs.map(song => (
						<ExpansionPanel>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>{song.title}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Typography>{song.description}</Typography>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))}
				</PlaylistPaper>
			</PageWrapper>
		);
	}
}

export default Playlist;
