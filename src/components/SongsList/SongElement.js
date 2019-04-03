import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { SongsListRow } from "../containers/StyledContainers";

const SongElement = props => {
	const {
		song: { id, performer, title, category },
		handleCheckboxSelect,
		checked = {}
	} = props;

	return (
		<SongsListRow elevation={1}>
			<Checkbox
				name={id}
				color="primary"
				icon={<MdCheckBoxOutlineBlank fontSize="big" />}
				checkedIcon={<MdCheckBox fontSize="big" />}
				checked={checked[id] ? checked[id] : false}
				onChange={handleCheckboxSelect}
			/>
			<Link to={`/lista-piosenek/${id}`}>
				<Typography variant="h5">
					{performer ? performer + " - " + title : title}
				</Typography>
				<Typography variant="h6">{" " + category}</Typography>
			</Link>
		</SongsListRow>
	);
};

export default SongElement;
