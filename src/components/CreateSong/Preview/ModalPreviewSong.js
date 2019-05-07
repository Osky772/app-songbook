import React from "react";
import Modal from "@material-ui/core/Modal";
import {
	ContainerModal,
	WrapperInModal
} from "../../containers/StyledContainers";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { styles, formatSongDescription } from "../../Songs/Page/Song";

const ModalPreviewSong = props => {
	const { classes, isPreviewed, handleSongPreview } = props;
	let {
		song,
		song: { performer = "", title = "", category = "" }
	} = props;

	const textWithChords = formatSongDescription(song, 0);

	return (
		<Modal open={isPreviewed} style={{ zIndex: 11000 }}>
			<ContainerModal>
				<WrapperInModal>
					<div
						style={{
							padding: "20px 30px 80px 30px",
							height: "100%",
							overflow: "auto"
						}}
					>
						<h2>{performer ? performer + " - " + title : title}</h2>
						<h4>{category}</h4>
						{textWithChords.map((verse, i) => {
							return verse.text !== null ? (
								<p key={i} className={classes.verse}>
									<span className={classes.text}>{verse.text}</span>
									<span className={classes.chords}>
										{verse.transposedChords ? verse.transposedChords : null}
									</span>
								</p>
							) : (
								<br key={i} />
							);
						})}
						<Button onClick={handleSongPreview}>Wróć</Button>
					</div>
				</WrapperInModal>
			</ContainerModal>
		</Modal>
	);
};

export default withStyles(styles)(ModalPreviewSong);
