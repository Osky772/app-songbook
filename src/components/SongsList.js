import React, { Component, Fragment } from "react";
import { Link, Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Song from "./Song";

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

	async componentDidMount() {
		const songs = await (await fetch("/data.json")).json();
		this.setState({ songs });
	}

	render() {
		const { songs } = this.state;
		const {
			match: { url }
		} = this.props;
		return (
			<Fragment>
				{songs.map(({ id, performer, title }) => (
					<Link key={id} to={`${url}/${id}`}>
						<Paper elevation={1} style={styles.paper}>
							<Typography variant="h5" component="h3">
								{performer + " - " + title}
							</Typography>
						</Paper>
					</Link>
				))}
				<Route path={`${url}/songId`} render={() => <h1>Song</h1>} />
			</Fragment>
		);
	}
}

export default SongsList;
