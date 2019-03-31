import React, { Component } from "react";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlist extends Component {
	state = {
		playlist: {}
	};

	componentDidMount() {
		const { playlistId } = this.props.match.params;
		console.log(playlistId);
		fetch(`${BASE_URL}/playlists/${playlistId}.json`)
			.then(r => r.json())
			.then(playlist => {
				this.setState({ playlist });
			});
	}

	render() {
		const { title, songs } = this.state.playlist;
		return <h1>{title}</h1>;
	}
}

export default Playlist;
