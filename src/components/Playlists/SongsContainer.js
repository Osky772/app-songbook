import React, { Component, Fragment } from "react";
import { SongsList, Container } from "../containers/StyledContainers";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { FaTrashAlt } from "react-icons/fa";

class SongsContainer extends Component {
	state = {};
	render() {
		const { songs = [], removeSong } = this.props;

		return (
			<Fragment>
				<Typography variant="h5" style={{ margin: "10px 0 25px 0" }}>
					Wybrane piosenki
				</Typography>
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
													padding: "10px",
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between"
												}}
												elevation={1}
											>
												<div style={{ display: "flex" }}>
													<Typography variant="h5" style={{ marginRight: 15 }}>
														{nr + 1}.
													</Typography>
													<Typography variant="h5">
														{performer ? performer + " - " + title : title}
													</Typography>
												</div>
												<FaTrashAlt
													onMouseEnter={e =>
														(e.target.style.cursor = "pointer")
													}
													onClick={() => removeSong(id)}
													fontSize={20}
													style={{ marginRight: 15 }}
												/>
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

export default SongsContainer;
