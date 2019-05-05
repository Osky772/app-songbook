import React, { Component, Fragment } from "react";
import { PageWrapper, SongPaper } from "../../containers/StyledContainers";
import { withStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";

const BASE_URL = "https://app-songbook.firebaseio.com";

const transposeChord = (chord, amount) => {
	if (chord === chord.toUpperCase()) {
		var scale = [
			"C",
			"Cis",
			"D",
			"Dis",
			"E",
			"F",
			"Fis",
			"G",
			"Gis",
			"A",
			"Ais",
			"H"
		];
		return chord.replace(/[CDEFGAH]#?/g, function(match) {
			var i = (scale.indexOf(match) + amount) % scale.length;
			return scale[i < 0 ? i + scale.length : i];
		});
	}

	if (chord === chord.toLowerCase()) {
		var scale = [
			"c",
			"cis",
			"d",
			"dis",
			"e",
			"f",
			"fis",
			"g",
			"gis",
			"a",
			"ais",
			"h"
		];
		return chord.replace(/[cdefgah]#?/g, function(match) {
			var i = (scale.indexOf(match) + amount) % scale.length;
			return scale[i < 0 ? i + scale.length : i];
		});
	}
};

export const formatSongDescription = ({ description = "" }) => {
	let verses = description.split("\n");

	const textWithChords = verses.map(verse => {
		const text = verse.split("<")[0] ? verse.split("<")[0].trim() : null;
		const chords = verse.split("<")[1]
			? verse
					.split("<")[1]
					.trim()
					.slice(0, -1)
					.split(",")
					.join(", ")
			: null;
		const chordsToTranspose = chords
			? chords.split(",").map(chord => chord.trim())
			: null;
		const transposed = chordsToTranspose
			? chordsToTranspose.map(chord => {
					return chords !== null ? transposeChord(chord, 2) : null;
			  })
			: null;
		console.log(transposed);

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
		paddingBottom: 15,
		[theme.breakpoints.down("sm")]: {
			position: "relative",
			paddingTop: 0
		}
	},
	verse: {
		display: "flex",
		justifyContent: "space-between",
		marginTop: 7,
		marginBottom: 0
	},
	text: {
		width: "75%",
		[theme.breakpoints.down("xs")]: {
			width: "70%",
			lineHeight: 1.2
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
	},
	spinnerWrapper: {
		display: "flex",
		justifyContent: "center"
	}
});

class Song extends Component {
	state = {
		song: {},
		fetchInProgress: null
	};

	componentWillMount() {
		const { songId } = this.props.match.params;
		this.setState({ fetchInProgress: true });
		fetch(`${BASE_URL}/songs/${songId}.json`)
			.then(r => r.json())
			.then(song => {
				this.setState({ song, fetchInProgress: false });
			});
	}

	render() {
		let {
			song,
			song: { performer = "", title = "", category = "" },
			fetchInProgress
		} = this.state;
		const { classes } = this.props;
		const textWithChords = formatSongDescription(song);

		console.log(song);

		return (
			<PageWrapper className={classes.wrapper}>
				<SongPaper className={classes.container}>
					{fetchInProgress ? (
						<div className={classes.spinnerWrapper}>
							<Loader type="Oval" color="#039be5" width={120} height={120} />
						</div>
					) : (
						<Fragment>
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
									<span
										key={i}
										style={{ display: "block", height: 10, width: "100%" }}
									/>
								);
							})}
						</Fragment>
					)}
				</SongPaper>
			</PageWrapper>
		);
	}
}

export default withStyles(styles)(Song);
