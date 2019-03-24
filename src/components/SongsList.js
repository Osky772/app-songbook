import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { GiSpellBook } from "react-icons/gi";
import PageWrapper from "./containers/PageWrapper";
import Grid from "@material-ui/core/Grid";

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
					<Grid container>
						<Grid item lg={4}>
							<div
								style={{
									height: "100%",
									width: "100%",
									border: "1px solid gray"
								}}
							>
								Okey
							</div>
						</Grid>
						<Grid item lg={8}>
							<GiSpellBook style={{ fontSize: "100px" }} />
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
