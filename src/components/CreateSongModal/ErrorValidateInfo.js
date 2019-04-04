import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { MdError as ErrorIcon } from "react-icons/md";

const ErrorValidateInfo = ({ error }) => {
	const { title, category, description } = error;
	let message = [];

	if (title) {
		message.push("tytuł");
	}
	if (category) {
		message.push("kategoria");
	}
	if (description) {
		message.push("tekst");
	}

	return (
		<div
			style={message.length === 0 ? { display: "none" } : { display: "block" }}
		>
			<SnackbarContent
				style={{
					backgroundColor: "#d30033",
					margin: "15px 0 35px 0",
					height: 40,
					width: "calc(100% - 50px)",
					maxWidth: "100%",
					position: "absolute"
				}}
				message={
					<span style={{ display: "flex", marginLeft: "-5px" }}>
						<ErrorIcon
							style={{
								fontSize: 15,
								height: "100%",
								marginRight: 10
							}}
						/>
						<span>
							Musisz uzupełnić pole:
							<span style={{ fontWeight: "bold" }}> {message.join(", ")} </span>
							aby dodać piosenkę!
						</span>
					</span>
				}
			/>
		</div>
	);
};

export default ErrorValidateInfo;
