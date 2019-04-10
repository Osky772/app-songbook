import React, { Component } from "react";
import { db } from "../../App";
import { ListContainer, ListItem } from "../containers/StyledContainers";

class AdminPanel extends Component {
	state = {
		songs: []
	};

	componentDidMount() {
		db.ref("songs-to-approve")
			.once("value")
			.then(snapshot => {
				const songs = snapshot.val() || {};
				const arraySongs = Object.keys(songs).map(key => ({
					id: key,
					...songs[key]
				}));
				this.setState({ songs: arraySongs || [], ref: db.ref("songs") });
			});

		db.ref("songs-to-approve").on("value", snapshot => {
			const songs = snapshot.val() || {};
			const arraySongs = Object.keys(songs).map(key => ({
				id: key,
				...songs[key]
			}));
			this.setState({ songs: arraySongs || [] });
		});
	}
	componentWillUnmount() {
		this.state.ref && this.state.ref.off();
	}

	render() {
		const { songs = [] } = this.state;
		return (
			<ListContainer>
				<h1>Admin Panel</h1>
				{songs.map(song => (
					<ListItem>{song.title}</ListItem>
				))}
			</ListContainer>
		);
	}
}

export default AdminPanel;
