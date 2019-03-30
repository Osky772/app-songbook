import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

const PaperContainer = ({ className, children }) => (
	<Paper className={className}>{children}</Paper>
);

export const SongsListRow = styled(PaperContainer)`
	padding: 15px 20px;
	margin: 0px 10px 15px 10px;
	border-radius: 0;
	display: flex;
`;

// export const SongsListRow = styled.Paper`
// padding: "15px 20px";
// margin: "0px 10px 15px 10px";
// border-radius: 0;
// display: flex
// `
