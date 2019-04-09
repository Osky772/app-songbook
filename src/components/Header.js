import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import { GiSpellBook } from "react-icons/gi";
import ModalCreateSong from "./CreateSongModal/CreateSongModal";
import CreatePDF from "./CreatePDF";
import CreatePlaylist from "./Playlists/CreatePlaylist";

const styles = {
	firstAppBar: {
		position: "static"
	},
	secondAppBar: {
		position: "sticky"
	},
	Toolbar: {
		padding: "5px 10px 0 10px"
	},
	flexContainer: {
		display: "flex",
		alignItems: "center"
	},
	flexEnd: {
		display: "flex",
		justifyContent: "flex-end"
	},
	maxWidth: {
		maxWidth: 1030,
		margin: "0 auto",
		alignItems: "center",
		justifyContent: "space-between"
	}
};

class Header extends Component {
	state = {
		value: 0
	};

	handleChange = (e, value) => {
		this.setState({ value });
	};

	render() {
		const { value } = this.state;
		const { selectedSongs, editedPlaylist, handleSelectSongs } = this.props;

		return (
			<Fragment>
				<AppBar style={styles.firstAppBar} color="primary">
					<Grid container style={styles.maxWidth}>
						<Grid item lg={4} style={styles.flexContainer}>
							<GiSpellBook style={{ fontSize: "55px", marginRight: "25px" }} />
							<Typography
								component={Link}
								to="/lista-piosenek"
								variant="h6"
								color="inherit"
								style={{ textDecoration: "none" }}
							>
								Śpiewnik
							</Typography>
						</Grid>
						<Grid item lg={8} style={styles.flexEnd}>
							<CreatePlaylist
								editedPlaylist={editedPlaylist}
								selectedSongs={selectedSongs}
								handleSelectSongs={handleSelectSongs}
							/>
							<Button>Zaloguj się</Button>
							<Button>Zarejestruj się</Button>
						</Grid>
					</Grid>
				</AppBar>
				<AppBar style={styles.secondAppBar} color="primary">
					<Grid container style={styles.maxWidth}>
						<Grid item lg={4}>
							<Toolbar variant="dense" style={styles.Toolbar}>
								<Tabs value={value} onChange={this.handleChange}>
									<Tab
										component={Link}
										to="/lista-piosenek"
										label="Lista piosenek"
									/>
									<Tab component={Link} to="/playlisty" label="Playlisty" />
								</Tabs>
							</Toolbar>
						</Grid>
						<Grid item lg={8} style={styles.flexEnd}>
							<ModalCreateSong />
							<CreatePDF songs={selectedSongs} />
						</Grid>
					</Grid>
				</AppBar>
			</Fragment>
		);
	}
}

export default Header;
