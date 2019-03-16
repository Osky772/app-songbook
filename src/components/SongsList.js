import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
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
		const {
			match: { url }
		} = this.props;
		return (
			<Fragment>
				{songs.map(({ performer, title }) => (
					<Link to={`${url}/${performer}-${title}`}>
						<Paper elevation={1} style={styles.paper}>
							<Typography variant="h5" component="h3">
								{performer + " - " + title}
							</Typography>
						</Paper>
					</Link>
				))}
			</Fragment>
		);
	}
}

export default SongsList;
