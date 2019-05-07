import React, { Component, Fragment } from "react";
import { PageWrapper, SongPaper } from "../../containers/StyledContainers";
import { withStyles } from "@material-ui/core/styles";
import Loader from "react-loader-spinner";

const BASE_URL = "https://app-songbook.firebaseio.com";

const transposeChord = (chord, amount) => {
	if (chord === chord.toUpperCase()) {
		let scale = [
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
		return chord.replace(/[CDEFGAH](is)?/g, function(match) {
			let i = (scale.indexOf(match) + amount) % scale.length;
			return scale[i < 0 ? i + scale.length : i];
		});
	}

	if (chord === chord.toLowerCase()) {
		let scale = [
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
		return chord.replace(/[cdefgah](is)?/g, function(match) {
			let i = (scale.indexOf(match) + amount) % scale.length;
			return scale[i < 0 ? i + scale.length : i];
		});
	}
};

export const formatSongDescription = ({ description = "" }, transposeBy) => {
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
		const arrayOfChordsToTranspose = chords
			? chords.split(",").map(chord => chord.trim())
			: null;
		const transposedChords = arrayOfChordsToTranspose
			? arrayOfChordsToTranspose
					.map(chord => {
						return chords !== null ? transposeChord(chord, transposeBy) : null;
					})
					.join(",  ")
			: null;

		return { text, transposedChords };
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
	},
	transposeBtnWrapper: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		margin: 0
	},
	transposeBtn: {
		borderRadius: "100%",
		height: "30px",
		width: "30px",
		backgroundColor: "#039be5",
		color: "white",
		border: "none",
		fontSize: "15px",
		margin: "0 5px",
		cursor: "pointer"
	}
});

class Song extends Component {
	state = {
		song: {},
		fetchInProgress: null,
		transposeBy: 0
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

	transpose = e => {
		if (e.target.id === "+1") {
			this.setState({ ...this.state, transposeBy: this.state.transposeBy + 1 });
		}
		if (e.target.id === "-1") {
			this.setState({ ...this.state, transposeBy: this.state.transposeBy - 1 });
		}
	};

	render() {
		let {
			song,
			song: { performer = "", title = "", category = "" },
			fetchInProgress,
			transposeBy
		} = this.state;
		const { classes } = this.props;
		const textWithChords = formatSongDescription(song, transposeBy);
		return (
			<PageWrapper className={classes.wrapper}>
				<SongPaper className={classes.container}>
					{fetchInProgress ? (
						<div className={classes.spinnerWrapper}>
							<Loader type="Oval" color="#039be5" width={120} height={120} />
						</div>
					) : (
						<Fragment>
							<h2 style={{ margin: "10px 0" }}>
								{performer ? performer + " - " + title : title}
							</h2>
							<h4 style={{ margin: 0 }}>{category}</h4>
							<p className={classes.transposeBtnWrapper}>
								<button
									onClick={this.transpose}
									className={classes.transposeBtn}
									id="+1"
								>
									+1
								</button>
								<span>{transposeBy}</span>
								<button
									onClick={this.transpose}
									className={classes.transposeBtn}
									id="-1"
								>
									-1
								</button>
							</p>
							{textWithChords.map((verse, i) => {
								return verse.text !== null ? (
									<p key={i} className={classes.verse}>
										<span className={classes.text}>{verse.text}</span>
										<span className={classes.chords}>
											{verse.transposedChords ? verse.transposedChords : null}
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
