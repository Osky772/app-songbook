import React from "react";
import TextField from "@material-ui/core/TextField";

const SearchForm = ({ handleChange }) => {
	return (
		<form noValidate autoComplete="off">
			<TextField
				id="standard-full-width"
				label="Wyszukaj piosenkę"
				style={{ margin: 8 }}
				placeholder="Wpisz nazwę artysty lub tytuł piosenki..."
				fullWidth
				onChange={handleChange}
				margin="normal"
				InputLabelProps={{
					shrink: true
				}}
			/>
		</form>
	);
};

export default SearchForm;
