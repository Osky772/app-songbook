import React, { Component } from "react";

class Song extends Component {
	render() {
		console.log(this.props);
		let {
			song: { performer, title, description, category }
		} = this.props;
		console.log(description);

		let verses = description.split("\n");

		const textWithChords = verses.map(verse => {
			const text = verse.split("<")[0] ? verse.split("<")[0].trim() : null;
			const chords = verse.split("<")[1]
				? verse
						.split("<")[1]
						.trim()
						.slice(0, -1)
				: null;
			return { text, chords };
		});

		if (
			textWithChords[textWithChords.length - 1].text === "" &&
			textWithChords[textWithChords.length - 2].text === ""
		) {
			textWithChords.pop();
			textWithChords.pop();
		}

		if (textWithChords[textWithChords.length - 1].text === "") {
			textWithChords.pop();
		}

		console.log(textWithChords);

		return (
			<div>
				<h2>{performer + " - " + title}</h2>
				<h4>{category}</h4>
				{textWithChords.map(verse => {
					console.log(verse);
					return verse.text !== null ? (
						<p>
							{verse.text}
							<span>{verse.chords ? verse.chords : null}</span>
						</p>
					) : (
						<br />
					);
				})}
			</div>
		);
	}
}

export default Song;
