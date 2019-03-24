import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import PageWrapper from "./containers/PageWrapper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
				<PageWrapper>
					<Grid container spacing={24}>
						<Grid item md={4}>
							<div
								style={{
									height: "100%",
									width: "100%"
								}}
							>
								<Paper>
									<List component="nav" style={{ background: "white" }}>
										{songs.map(({ category }, i) =>
											i <= 10 ? (
												<ListItem button>
													<ListItemText primary={category} />
												</ListItem>
											) : null
										)}
									</List>
								</Paper>
							</div>
						</Grid>
						<Grid item md={8}>
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
						</Grid>
					</Grid>
				</PageWrapper>
			</Fragment>
		);
	}
}

export default SongsList;
