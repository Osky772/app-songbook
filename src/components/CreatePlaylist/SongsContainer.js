import React, { Component, Fragment } from "react";
import { SongsListRow, SongsList } from "../containers/StyledContainers";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Container = styled.div``;

class SongsContainer extends Component {
	state = {};
	render() {
		const { songs } = this.props;
		return (
			<Fragment>
				<Typography variant="h5" style={{ margin: "10px 0 25px 0" }}>
					Wybrane piosenki
				</Typography>
				<Droppable droppableId={"playlist"}>
					{provided => (
						<SongsList ref={provided.innerRef} {...provided.droppableProps}>
							{songs.map(({ id, performer, title }, nr) => (
								<Draggable draggableId={id} index={nr}>
									{provided => (
										<Container
											key={id}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
										>
											<SongsListRow elevation={1}>
												<Typography variant="h5" style={{ marginRight: 15 }}>
													{nr + 1}.
												</Typography>
												<div>
													<Typography variant="h5">
														{performer ? performer + " - " + title : title}
													</Typography>
												</div>
											</SongsListRow>
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
