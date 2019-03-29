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
		var dd = {
			content: [
				"First paragraph",
				"Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
			]
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
