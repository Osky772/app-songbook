import React, { Component } from "react";

class Song extends Component {
	render() {
		const {
			song: { performer, title, description, chords, category }
		} = this.props;
		return (
			<div>
				<h2>{performer + " - " + title}</h2>
				<h4>{category}</h4>
				<p>{description}</p>
				<p>{chords}</p>
			</div>
		);
	}
}

export default Song;
