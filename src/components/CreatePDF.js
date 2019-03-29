import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class CreatePDF extends Component {
	state = {
		songs: []
	};

	static getDerivedStateFromProps(props, state) {
		if (props.selectedSongs.length !== state.songs.length) {
			return {
				songs: props.selectedSongs
			};
		}
		return null;
	}

	createPDF = () => {
		const { songs } = this.state;

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

			const header = {
				text: title,
				style: "header"
			};

			const columns = [
				{
					width: "75%",
					text: text
				},
				{
					width: "20%",
					text: chords
				}
			];

			return [header, { columns }];
		});

		var dd = {
			content: ddContent,
			styles: {
				header: {
					fontSize: 18,
					bold: true,
					marginBottom: 6,
					marginTop: 15
				}
			}
		};

		pdfMake.createPdf(dd).open();
	};

	render() {
		return (
			<Button
				variant="outlined"
				style={{ height: "40px" }}
				onClick={this.createPDF}
			>
				Create PDF
			</Button>
		);
	}
}

export default CreatePDF;
