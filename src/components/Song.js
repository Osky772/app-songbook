import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import PageWrapper from "./containers/PageWrapper";

const BASE_URL = "https://app-songbook.firebaseio.com/";

class Song extends Component {
	state = {
		song: {}
	};

	componentWillMount() {
		const { songId } = this.props.match.params;
		fetch(`${BASE_URL}/songs/${songId}.json`)
			.then(r => r.json())
			.then(song => {
				this.setState({ song });
			});
	}

	render() {
		let {
			song: { performer = "", title = "", description = "", category = "" }
		} = this.state;

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

		return (
			<PageWrapper>
				<Paper style={{ width: "100%" }}>
					<h2>{performer ? performer + " - " + title : title}</h2>
					<h4>{category}</h4>
					{textWithChords.map((verse, i) => {
						return verse.text !== null ? (
							<p key={i}>
								{verse.text}
								<span className="chords">
									{verse.chords ? verse.chords : null}
								</span>
							</p>
						) : (
							<br key={i} />
						);
					})}
				</Paper>
			</PageWrapper>
		);
	}
}

export default Song;
