import React from "react";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

const PaperContainer = ({ className, children }) => (
	<Paper className={className}>{children}</Paper>
);

const Wrapper = ({ className, children }) => (
	<div className={className}>{children}</div>
);

export const PageWrapper = styled(Wrapper)`
	max-width: 1000px;
	margin: 0 auto;
	display: flex;
	justify-content: center;
`;

export const SongsListRow = styled(PaperContainer)`
	padding: 15px 20px;
	margin: 0px 10px 15px 10px;
	border-radius: 0;
	display: flex;
`;

export const PlaylistItem = styled(PaperContainer)`
	width: 80%;
	margin-bottom: 20px;
`;

export const SongPaper = styled(PaperContainer)`
	width: 80%;
	padding: 20px 60px 20px 60px;
	margin-bottom: 60;
	font-size: 16;
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
