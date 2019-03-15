import React, { Component, Fragment } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = {
	paper: {
		padding: "15px 20px",
		margin: "10px 10px",
		borderRadius: 0
	}
};

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
					<Paper elevation={1} style={styles.paper}>
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
