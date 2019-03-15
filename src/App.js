import React, { Component } from "react";

const data = { title: "im here!!!" };

async function fetchSongs() {
	const songs = await fetch("data.json").then(res => res.json());
	console.log(songs);
}

class App extends Component {
	add() {
		fetch("http://localhost:3000/data.json", {
			method: "POST",
			body: JSON.stringify(data)
		})
			.then(res => res.json())
			.catch(err => console.log("Error", err))
			.then(res => console.log("Success", res));
	}

	render() {
		return (
			<div>
				<button onClick={() => this.add()}>Add</button>
				<button onClick={() => fetchSongs()}>Fetch</button>
			</div>
		);
	}
}

export default App;
