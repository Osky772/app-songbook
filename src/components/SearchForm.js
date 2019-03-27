import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class SearchForm extends Component {
	state = {};
	render() {
		return (
			<TextField
				id="standard-full-width"
				label="Wyszukaj piosenkę"
				style={{ margin: 8 }}
				placeholder="Wpisz nazwę artysty lub tytuł piosenki..."
				fullWidth
				margin="normal"
				InputLabelProps={{
					shrink: true
				}}
			/>
		);
	}
}

export default SearchForm;
