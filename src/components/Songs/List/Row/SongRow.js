import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { SongsListRow } from "../../../containers/StyledContainers";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
	link: {
		textDecoration: "none"
	},
	title: {
		fontSize: 16
	},
	category: {
		fontSize: 13
	},
	checkbox: {
		width: "auto",
		padding: "0 10px 0 0"
	}
});

const SongRow = props => {
	const {
		song: { id, performer, title, category },
		handleCheckboxSelect,
		checked = {},
		classes
	} = props;

	return (
		<SongsListRow elevation={1}>
			<Checkbox
				name={id}
				color="primary"
				className={classes.checkbox}
				icon={<MdCheckBoxOutlineBlank fontSize="big" />}
				checkedIcon={<MdCheckBox fontSize="big" />}
				checked={checked[id] ? checked[id] : false}
				onChange={handleCheckboxSelect}
			/>
			<Link to={`/lista-piosenek/${id}`} className={classes.link}>
				<Typography className={classes.title}>
					{performer ? performer + " - " + title : title}
				</Typography>
				<Typography className={classes.category}>{" " + category}</Typography>
			</Link>
		</SongsListRow>
	);
};

export default withStyles(styles)(SongRow);
