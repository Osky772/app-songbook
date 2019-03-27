import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { BrowserRouter as Router } from "react-router-dom";

const theme = createMuiTheme({
	palette: {
		primary: blue
	},
	typography: {
		useNextVariants: true
	}
});

ReactDOM.render(
	<Router>
		<MuiThemeProvider theme={theme}>
			<App />
		</MuiThemeProvider>
	</Router>,
	document.getElementById("root")
);
