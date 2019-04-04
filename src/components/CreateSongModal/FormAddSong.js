import React from "react";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { FormWrapper } from "../containers/StyledContainers";
import InfoSnackBar from "../InfoSnackBar";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import ErrorValidateInfo from "./ErrorValidateInfo";

const styles = {
	textField: {
		display: "block",
		marginBottom: 15,
		marginTop: 0
	},
	select: {
		marginBottom: 15
	},
	textFieldMultiline: {
		display: "block",
		margin: 8
	}
};

const categories = [
	"polskie piosenki",
	"zagraniczne piosenki",
	"piosenki harcerskie",
	"piosenki religijne",
	"piosenki turystyczne",
	"piosenki ludowe",
	"pieśni patriotyczne",
	"piosenki dla dzieci",
	"szanty",
	"kolędy",
	"biesiadne"
];

const FormAddSong = props => {
	const {
		song: { category = "", title = "", performer = "", description = "" },
		handleSubmit,
		handleChange,
		handleChangeSongText,
		handleCloseModal,
		handleSongPreview,
		isError,
		error
	} = props;

	return (
		<FormWrapper>
			{isError && <ErrorValidateInfo error={error} />}
			<form onSubmit={handleSubmit} style={{ marginTop: "70px" }}>
				<TextField
					id="outlined-full-width"
					label="Tytuł *"
					error={error.title}
					name="title"
					style={styles.textField}
					onChange={handleChange}
					value={title}
					autoComplete="off"
					placeholder="Wpisz nazwę utworu"
					margin="normal"
					fullWidth
					variant="outlined"
					InputLabelProps={{
						shrink: true
					}}
				/>
				<TextField
					id="outlined-full-width"
					label="Wykonawca"
					name="performer"
					style={styles.textField}
					onChange={handleChange}
					value={performer}
					autoComplete="off"
					placeholder="Wpisz wykonawcę utworu"
					margin="normal"
					fullWidth
					variant="outlined"
					InputLabelProps={{
						shrink: true
					}}
				/>
				<FormControl error={error.category}>
					<InputLabel shrink htmlFor="select-multiple-native">
						Kategoria *
					</InputLabel>
					<Select
						native
						value={category}
						onChange={handleChange}
						name="category"
						style={styles.select}
						inputProps={{
							id: "select-multiple-native"
						}}
					>
						{category ? null : <option value="">Wybierz kategorię...</option>}
						{categories.map(category => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</Select>
				</FormControl>
				<InfoSnackBar message="Kolejne wersy oddzielaj enterem. Chwyty przypisane do danego wersu dodawaj w tej samej linii w nawiasach ostrych, oddzielonymi przecinkami, np. Tak, tak, tam w lustrze... <G, d, C>." />
				<TextField
					id="outlined-textarea"
					label="Tekst piosenki *"
					error={error.description}
					name="description"
					onChange={handleChangeSongText}
					value={description}
					placeholder="Tutaj wpisz tekst piosenki oraz chwyty"
					style={styles.textField}
					multiline
					rows="18"
					fullWidth
					margin="normal"
					variant="outlined"
					InputLabelProps={{
						shrink: true
					}}
					helperText="* pola obowiązkowe"
				/>

				<Button type="submit">Zatwierdź</Button>
				<Button onClick={handleCloseModal}>Wyjdź</Button>
				<Button onClick={handleSongPreview}>Podgląd</Button>
			</form>
		</FormWrapper>
	);
};

export default FormAddSong;
