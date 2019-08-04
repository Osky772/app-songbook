import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { withStyles } from "@material-ui/core/styles";
import styles from './styles';

const SongsListItem = props => {
	const {
		song: { id, performer, title, category },
		handleCheckboxSelect,
		checked = {},
		classes
	} = props;
	return (
		<Paper className={classes.container} elevation={1}>
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
		</Paper>
	);
};

export default withStyles(styles)(SongsListItem);
