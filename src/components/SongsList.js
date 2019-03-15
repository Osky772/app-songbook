import React, { Component } from "react";

class SongsList extends Component {
	fetchSongs = async () => {
		const songs = await fetch("data.json").then(res => res.json());
		console.log(songs);
	};

	componentDidMount() {
		this.fetchSongs();
	}

	render() {
		return <h1>Songs list</h1>;
	}
}

export default SongsList;
