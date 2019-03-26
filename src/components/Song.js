import React, { Component } from "react";

class Song extends Component {
	render() {
		console.log(this.props);
		let {
			song: { performer, title, description, category }
		} = this.props;
		console.log(description);

		// const text = description.split("\n");
		// console.log(text);

		return (
			<div>
				<h2>{performer + " - " + title}</h2>
				<h4>{category}</h4>
				<p>{description}</p>
			</div>
		);
	}
}

export default Song;
