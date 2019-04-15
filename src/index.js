import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router } from "react-router-dom";

const theme = createMuiTheme({
	palette: {
		primary: { main: "#039be5" },
		secondary: { main: "#ee6a03", dark: "#e54e03", light: "#ee6a03" }
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
