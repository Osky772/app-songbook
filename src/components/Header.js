import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";

const styles = {
	Toolbar: {
		padding: "5px 10px 0 10px"
	},
	maxWidth: {
		maxWidth: 1030,
		margin: "0 auto"
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
		return (
			<AppBar position="static" color="primary">
				<Grid container style={styles.maxWidth}>
					<Toolbar variant="dense" style={styles.Toolbar}>
						<Grid item lg={4}>
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
						<Grid item lg={8}>
							<Tabs value={value} onChange={this.handleChange}>
								<Tab
									component={Link}
									to="/lista-piosenek"
									label="Lista piosenek"
								/>
								<Tab component={Link} to="/playlisty" label="Playilisty" />
							</Tabs>
						</Grid>
					</Toolbar>
				</Grid>
			</AppBar>
		);
	}
}

export default Header;
