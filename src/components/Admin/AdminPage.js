import React, { Component } from "react";
import { db } from "../../App";
import { ListContainer, ListItem } from "../containers/StyledContainers";

class AdminPage extends Component {
	state = {
		songs: [],
		isAdmin: false,
		user: null
	};

	getSongs = () => {
		const { user } = this.props;
		db.ref("songs-to-approve")
			.once("value")
			.then(snapshot => {
				const songs = snapshot.val() || {};
				const arraySongs = Object.keys(songs).map(key => ({
					id: key,
					...songs[key]
				}));
				this.setState({
					songs: arraySongs || [],
					isAdmin: true,
					ref: db.ref("songs"),
					user
				});
			});

		db.ref("songs-to-approve").on("value", snapshot => {
			const songs = snapshot.val() || {};
			const arraySongs = Object.keys(songs).map(key => ({
				id: key,
				...songs[key]
			}));
			this.setState({ songs: arraySongs || [] });
		});
	};

	componentDidMount() {
		this.getSongs();
	}

	componentWillUnmount() {
		const { user } = this.props;
		this.state.ref && this.state.ref.off();

		if (user === null) {
			this.setState({ songs: [], isAdmin: false, user: null });
			return;
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.user !== prevProps.user) {
			this.getSongs();
			this.setState({ user: this.props.user });
		}
	}

	static getDerivedStateFromProps(props, state) {
		if (props.user === null) {
			return {
				...state,
				user: null,
				isAdmin: false
			};
		}
		return null;
	}

	render() {
		const { songs = [], isAdmin } = this.state;
		return isAdmin ? (
			<ListContainer>
				<h1>Admin Panel</h1>
				{songs.map(song => (
					<ListItem>{song.title}</ListItem>
				))}
			</ListContainer>
		) : null;
	}
}

export default AdminPage;
