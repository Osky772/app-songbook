import React, { Component } from "react";
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
					<Typography variant="h6" color="inherit">
						Śpiewnik
					</Typography>
					<Tabs value={0}>
						<Tab label="Lista piosenek" />
						<Tab label="Playilisty" />
					</Tabs>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;
