import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

class SongsList extends Component {
	state = {
		songs: []
	};

	fetchSongs = async () => {
		fetch("data.json")
			.then(res => res.json())
			.then(data => this.setState({ songs: data }));
	};

	componentDidMount() {
		this.fetchSongs();
	}

	render() {
		const { songs } = this.state;

		return (
			<Fragment>
				{songs.map(song => (
					<Paper elevation={1}>
						<Typography variant="h5" component="h3">
							{song.performer + " - " + song.title}
						</Typography>
					</Paper>
				))}
			</Fragment>
		);
	}
}

export default SongsList;
