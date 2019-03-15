import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const styles = {
	Toolbar: {
		padding: "5px 10px 0 10px"
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
				<Toolbar variant="dense" style={styles.Toolbar}>
					<Typography
						component={Link}
						to="/lista-piosenek"
						variant="h6"
						color="inherit"
						style={{ textDecoration: "none" }}
					>
						Śpiewnik
					</Typography>
					<Tabs value={value} onChange={this.handleChange}>
						<Tab component={Link} to="/lista-piosenek" label="Lista piosenek" />
						<Tab component={Link} to="/playlisty" label="Playilisty" />
					</Tabs>
				</Toolbar>
			</AppBar>
		);
	}
}

export default Header;
