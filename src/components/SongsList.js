import React, { Component, Fragment } from "react";
import { BrowserRouter, Link, Route } from "react-router-dom";
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
	render() {
		const { songs, getSong } = this.props;
		return (
			<Fragment>
				{songs.map(({ id, performer, title }) => (
					<Link
						onClick={() => getSong(id)}
						key={id}
						to={`/lista-piosenek/${id}`}
					>
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
