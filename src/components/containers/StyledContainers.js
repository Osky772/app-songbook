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

export const WrapperInModal = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 50%;
	height: 90%;
	background: white;
	outline: none;
`;

export const FormWrapper = styled.div`
	padding: 25px;
	height: 100%;
`;
