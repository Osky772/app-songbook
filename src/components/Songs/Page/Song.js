import React, { Component } from "react";
import { PageWrapper, SongPaper } from "../../containers/StyledContainers";
import { withStyles } from "@material-ui/core/styles";

const BASE_URL = "https://app-songbook.firebaseio.com/";

export const formatSongDescription = ({ description = "" }) => {
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

	return textWithChords;
};

export const styles = theme => ({
	wrapper: {
		zIndex: 9000,
		[theme.breakpoints.down("xs")]: {
			paddingTop: 0
		},
		[theme.breakpoints.down("sm")]: {
			position: "relative"
		}
	},
	verse: {
		display: "flex",
		justifyContent: "space-between",
		margin: "10px 0"
	},
	text: {
		width: "75%",
		[theme.breakpoints.down("xs")]: {
			width: "70%"
		}
	},
	chords: {
		width: "20%",
		[theme.breakpoints.down("xs")]: {
			width: "25%"
		}
	},
	container: {
		width: "100%",
		padding: 15
	}
});

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
			song,
			song: { performer = "", title = "", category = "" }
		} = this.state;
		const { classes } = this.props;
		const textWithChords = formatSongDescription(song);

		return (
			<PageWrapper className={classes.wrapper}>
				<SongPaper className={classes.container}>
					<h2>{performer ? performer + " - " + title : title}</h2>
					<h4>{category}</h4>
					{textWithChords.map((verse, i) => {
						return verse.text !== null ? (
							<p key={i} className={classes.verse}>
								<span className={classes.text}>{verse.text}</span>
								<span className={classes.chords}>
									{verse.chords ? verse.chords : null}
								</span>
							</p>
						) : (
							<br key={i} />
						);
					})}
				</SongPaper>
			</PageWrapper>
		);
	}
}

export default withStyles(styles)(Song);
