import React from "react";
import TextField from "@material-ui/core/TextField";

const SearchForm = ({ handleChange, label, placeholder }) => {
	return (
		<form noValidate autoComplete="off">
			<TextField
				id="standard-full-width"
				label={label}
				placeholder={placeholder}
				fullWidth
				onChange={handleChange}
				margin="normal"
				style={{ marginTop: 0 }}
				InputLabelProps={{
					shrink: true
				}}
			/>
		</form>
	);
};

export default SearchForm;
