import React, { Component } from "react";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Song extends Component {
	state = {
		songs: [],
		song: {}
	};

	// fetchSong = () => {
	// 	fetch(`${BASE_URL}/songs.json`)
	// 		.then(r => r.json())
	// 		.then(songs => {
	// 			const arraySongs =
	// 				songs &&
	// 				Object.keys(songs).map(key => ({
	// 					id: key,
	// 					...songs[key]
	// 				}));
	// 			const song = arraySongs.find(song => {
	// 				console.log(song.id);
	// 				console.log(this.props.match.params);
	// 				return song.id === this.props.match.params.songId;
	// 			});
	// 			console.log(song);
	// 			this.setState({ song });
	// 		});
	// };

	render() {
		console.log(this.props.match.params.songId);
		// if (this.state.song) {
		// 	this.fetchSong();
		// }
		console.log(this.state.song);
		// let {
		// 	song: { performer, title, description, category }
		// } = this.state;

		// let verses = description.split("\n");

		// const textWithChords = verses.map(verse => {
		// 	const text = verse.split("<")[0] ? verse.split("<")[0].trim() : null;
		// 	const chords = verse.split("<")[1]
		// 		? verse
		// 				.split("<")[1]
		// 				.trim()
		// 				.slice(0, -1)
		// 		: null;
		// 	return { text, chords };
		// });

		// if (
		// 	textWithChords[textWithChords.length - 1].text === "" &&
		// 	textWithChords[textWithChords.length - 2].text === ""
		// ) {
		// 	textWithChords.pop();
		// 	textWithChords.pop();
		// }

		// if (textWithChords[textWithChords.length - 1].text === "") {
		// 	textWithChords.pop();
		// }

		return (
			<h1>Hello</h1>
			// <div>
			// 	<h2>{performer + " - " + title}</h2>
			// 	<h4>{category}</h4>
			// 	{textWithChords.map((verse, i) => {
			// 		return verse.text !== null ? (
			// 			<p key={i}>
			// 				{verse.text}
			// 				<span className="chords">
			// 					{verse.chords ? verse.chords : null}
			// 				</span>
			// 			</p>
			// 		) : (
			// 			<br key={i} />
			// 		);
			// 	})}
			// </div>
		);
	}
}

export default Song;
