import React from "react";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { MdError as ErrorIcon } from "react-icons/md";

const ErrorValidateInfo = () => {
	return (
		<SnackbarContent
			style={{
				backgroundColor: "#d30033",
				marginTop: 15,
				height: 50,
				maxWidth: "100%"
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
					'Error'
				</span>
			}
		/>
	);
};

export default ErrorValidateInfo;
