import React from "react";
import Modal from "@material-ui/core/Modal";
import { ContainerModal, WrapperInModal } from "../containers/StyledContainers";
import Button from "@material-ui/core/Button";

const ModalPreviewSong = props => {
	const { isPreviewed, handleSongPreview } = props;

	return (
		<Modal open={isPreviewed}>
			<ContainerModal>
				<WrapperInModal>
					<div>
						Hello
						<Button onClick={handleSongPreview}>Wyjdź</Button>
					</div>
				</WrapperInModal>
			</ContainerModal>
		</Modal>
	);
};

export default ModalPreviewSong;
