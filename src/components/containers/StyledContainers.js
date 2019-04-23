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
	padding-top: 40px;
	margin-bottom: 40px;
	display: flex;
	justify-content: center;
`;

export const ListContainer = styled.div`
	flex-direction: column;
`;

export const SongsListRow = styled(PaperContainer)`
	padding: 10px 15px;
	margin: 0px 10px 15px 10px;
	border-radius: 0;
	display: flex;
	align-items: start;
`;

export const Container = styled.div`
	margin: 0px 10px 15px 10px;
	border-radius: 0;
`;

export const SongsList = styled.div``;

export const ContainerModal = styled.div`
	width: 100%;
	display: flex;
	height: 100%;
	justify-content: center;
	align-items: center;
`;

export const ItemElement = styled(PaperContainer)`
	width: 80%;
	margin-bottom: 20px;
	margin: 0 auto 20px auto;
`;

export const PlaylistItem = styled(PaperContainer)`
	width: 100%;
	margin: 15px auto 0px auto;
`;

export const SongPaper = styled(PaperContainer)`
	width: 80%;
	padding: 20px 60px 20px 60px;
	margin-bottom: 60;
	font-size: 16;
`;

export const WrapperInModal = styled.div`
	width: 700px;
	height: 100vh;
	background: white;
	outline: none;
`;

export const FormWrapper = styled.div`
	padding: 0px 25px 25px 25px;
	height: 100%;
	overflow-y: auto;
	position: relative;
`;
