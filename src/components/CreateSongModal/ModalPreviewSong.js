import React from "react";
import Modal from "@material-ui/core/Modal";
import { ContainerModal, WrapperInModal } from "../containers/StyledContainers";
import Button from "@material-ui/core/Button";

import { styles, formatSongDescription } from "../Song";

const ModalPreviewSong = props => {
	const { isPreviewed, handleSongPreview } = props;
	let {
		song,
		song: { performer = "", title = "", category = "" }
	} = props;

	const textWithChords = formatSongDescription(song);

	return (
		<Modal open={isPreviewed}>
			<ContainerModal>
				<WrapperInModal>
					<div
						style={{ padding: "20px 30px", height: "100%", overflow: "auto" }}
					>
						<h2>{performer ? performer + " - " + title : title}</h2>
						<h4>{category}</h4>
						{textWithChords.map((verse, i) => {
							return verse.text !== null ? (
								<p key={i} style={styles.verse}>
									<span style={styles.text}>{verse.text}</span>
									<span style={styles.chords}>
										{verse.chords ? verse.chords : null}
									</span>
								</p>
							) : (
								<br key={i} />
							);
						})}
						<Button onClick={handleSongPreview}>Wyjdź</Button>
					</div>
				</WrapperInModal>
			</ContainerModal>
		</Modal>
	);
};

export default ModalPreviewSong;
