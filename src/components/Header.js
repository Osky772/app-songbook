import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

class Header extends Component {
	render() {
		return (
			<AppBar position="static">
				<Toolbar variant="dense">
					<Typography
						component={Link}
						to="/lista-piosenek"
						variant="h6"
						color="inherit"
						style={{ textDecoration: "none" }}
					>
						Śpiewnik
					</Typography>
					<Tabs value={0}>
						<Tab component={Link} to="/lista-piosenek" label="Lista piosenek" />
						<Tab component={Link} to="/playlisty" label="Playilisty" />
					</Tabs>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;
