import React, { Component, Fragment } from "react";
import Header from "./components/Header";
import CssBaseline from "@material-ui/core/CssBaseline";

class App extends Component {
	render() {
		return (
			<Fragment>
				<CssBaseline />
				<Header />
			</Fragment>
		);
	}
}

export default App;
