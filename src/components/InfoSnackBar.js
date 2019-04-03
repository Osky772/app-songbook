import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { MdError as ErrorIcon } from "react-icons/md";

const InfoSnackBar = ({ message }) => {
	return (
		<SnackbarContent
			style={{
				backgroundColor: "#fca525",
				margin: "15px 0 35px 0",
				maxWidth: "100%"
			}}
			message={
				<span style={{ display: "flex", marginLeft: "-5px" }}>
					<ErrorIcon
						style={{
							fontSize: 50,
							height: "100%",
							marginRight: 10
						}}
					/>

					<span>
						<div style={{ fontWeight: "bold" }}>{"Uwaga!"}</div>
						{message}
					</span>
				</span>
			}
		/>
	);
};

export default InfoSnackBar
