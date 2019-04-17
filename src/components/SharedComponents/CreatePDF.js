import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { MdFileDownload } from "react-icons/md";
import withWidth from "@material-ui/core/withWidth";
import toRenderProps from "recompose/toRenderProps";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const styles = theme => ({
	Btn: {
		color: "white",
		fontSize: "14px",
		fontWeight: "bold",
		textTransform: "none",
		padding: "3px 25px",
		marginLeft: 15,
		display: "inline-flex",
		[theme.breakpoints.down("xs")]: {
			display: "inline-flex",
			position: "fixed",
			bottom: 20
		}
	},
	active: {
		backgroundColor: "#DC244A",
		color: "white",
		"&:hover": {
			backgroundColor: "#c72042"
		}
	},
	disabled: {
		color: "#cbd3df",
		backgroundColor: "#a4b0bd"
	}
});

const WithWidth = toRenderProps(withWidth());

class CreatePDF extends Component {
	state = {
		songs: []
	};

	static getDerivedStateFromProps(props, state) {
		if (props.songs.length !== state.songs.length) {
			return {
				title: props.title,
				songs: props.songs
			};
		}
		return null;
	}

	createPDF = () => {
		const { title = "", songs } = this.state;

		const ddContent = songs.map(song => {
			const title = song.title;

			const text = song.description
				.split("\n")
				.map(verse => (verse.split("<")[0] ? verse.split("<")[0].trim() : ""))
				.join("\n");

			const chords = song.description
				.split("\n")
				.map(verse =>
					verse.split("<")[1]
						? verse
								.split("<")[1]
								.trim()
								.slice(0, -1)
								.split(", ")
								.join(" ")
						: ""
				)
				.join("\n");

			return [
				{
					text: title,
					style: "header"
				},
				{
					columns: [
						{
							width: "75%",
							text: text
						},
						{
							width: "20%",
							text: chords
						}
					]
				}
			];
		});

		var dd = {
			header: {
				text: "app.spiewnik - największa podręczna baza piosenek",
				style: "watermark"
			},
			footer: function(currentPage, pageCount) {
				return [
					{
						text: currentPage.toString() + " z " + pageCount,
						alignment: "center"
					}
				];
			},
			content: [
				{
					text: title,
					style: "title"
				},
				...ddContent
			],
			styles: {
				title: {
					marginBottom: 15,
					fontSize: 25,
					bold: true
				},
				header: {
					fontSize: 18,
					bold: true,
					marginBottom: 6,
					marginTop: 15
				},
				watermark: {
					marginLeft: 40,
					marginTop: 15,
					fontSize: 8
				}
			}
		};

		pdfMake.createPdf(dd).open();
	};

	render() {
		const { songs } = this.state;
		const { classes } = this.props;

		return (
			<WithWidth>
				{({ width }) =>
					width === "xs" ? (
						<Button
							variant="contained"
							className={classNames(classes.Btn, classes.active)}
							disabled={Boolean(!songs.length)}
							onClick={songs.length ? this.createPDF : null}
						>
							<MdFileDownload />
						</Button>
					) : (
						<Button
							variant="contained"
							className={classNames(classes.Btn, classes.active)}
							disabled={Boolean(!songs.length)}
							onClick={songs.length ? this.createPDF : null}
						>
							Pobierz plik PDF
						</Button>
					)
				}
			</WithWidth>
		);
	}
}

export default withStyles(styles)(CreatePDF);
