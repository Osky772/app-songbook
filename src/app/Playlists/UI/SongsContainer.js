import React, { Component, Fragment } from "react";
import { SongsList, Container } from "../../containers/StyledContainers";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FaTrashAlt } from "react-icons/fa";
import { withStyles } from "@material-ui/core/styles";
import { MdMenu } from "react-icons/md";

const styles = {
	title: {
		fontSize: 18,
		margin: "15px 0 15px 0"
	},
	songTitle: {
		width: "100%",
		fontSize: 16,
		display: "flex",
		alignItems: "center"
	},
	dragIcon: {
		width: 35,
		fontSize: 27,
		marginRight: 15
	},
	trashIcon: {
		width: 35,
		fontSize: 20,
		marginRight: 15
	}
};

class SongsContainer extends Component {
	state = {};
	render() {
		const { classes, songs = [], removeSong } = this.props;

		return (
			<Fragment>
				<Typography className={classes.title}>Wybrane piosenki</Typography>
				<Droppable droppableId={"playlist"}>
					{provided => (
						<SongsList ref={provided.innerRef} {...provided.droppableProps}>
							{songs.map(({ id, performer, title }, nr) => (
								<Draggable key={nr} draggableId={id} index={nr}>
									{provided => (
										<Container
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
										>
											<Paper
												style={{
													width: "100%",
													padding: "10px"
												}}
												elevation={1}
											>
												<div
													style={{
														display: "flex",
														alignItems: "center",
														justifyContent: "space-between"
													}}
												>
													<MdMenu className={classes.dragIcon} />

													<Typography className={classes.songTitle}>
														{nr + 1}
														{". "}
														{performer ? performer + " - " + title : title}
													</Typography>
													<FaTrashAlt
														onMouseEnter={e =>
															(e.target.style.cursor = "pointer")
														}
														onClick={() => removeSong(id)}
														className={classes.trashIcon}
													/>
												</div>
											</Paper>
										</Container>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</SongsList>
					)}
				</Droppable>
			</Fragment>
		);
	}
}

export default withStyles(styles)(SongsContainer);
