import React from "react";

const styles = {
	maxWidth: "1000px",
	margin: "0 auto",
	display: "flex",
	marginTop: "80px"
};

const PageWrapper = ({ children }) => {
	return <div style={styles}>{children}</div>;
};

export default PageWrapper;