import React from "react";

const InitPage = props => {
	console.log(props.history.location);
	props.history.push("/lista-piosenek");
	return <div>hello</div>;
};

export default InitPage;
