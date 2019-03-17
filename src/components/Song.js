import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";

class Song extends Component {
	render() {
		const { song } = this.props;
		return (
			<div>
				<h2>Id</h2>
				<h3>Title</h3>
				<h4>Performer</h4>
				<p>Description</p>
			</div>
		);
	}
}

export default Song;
