import React, { Component } from "react";
import PageWrapper from "./containers/PageWrapper";
import { PlaylistItem } from "./containers/StyledContainers";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Playlists extends Component {
	state = {
		playlists: []
	};

	componentDidMount() {
		fetch(`${BASE_URL}/playlists.json`)
			.then(r => r.json())
			.then(playlists => {
				const arrayPlaylists =
					playlists &&
					Object.keys(playlists).map(key => ({
						id: key,
						...playlists[key]
					}));
				this.setState({ playlists: arrayPlaylists || [] });
			});
	}

	render() {
		const { playlists = [] } = this.state;
		console.log(playlists);
		return (
			<PageWrapper>
				<PlaylistItem>
					<h1>Hello</h1>
				</PlaylistItem>
			</PageWrapper>
		);
	}
}

export default Playlists;
