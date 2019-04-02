import React, { Component, Fragment } from "react";
import { SongsList, Container } from "../containers/StyledContainers";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

class SongsContainer extends Component {
	state = {};
	render() {
		const { songs = [], selectedSongs = [] } = this.props;
		// const songsList = songs.concat(selectedSongs);
		// console.log(selectedSongs);

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
													display: "flex"
												}}
												elevation={1}
											>
												<Typography variant="h5" style={{ marginRight: 15 }}>
													{nr + 1}.
												</Typography>
												<div>
													<Typography variant="h5">
														{performer ? performer + " - " + title : title}
													</Typography>
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

export default SongsContainer;
