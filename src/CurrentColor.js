import React from "react";

function CurrentColor(props) {
	console.log(props);
	return (
		<div
			style={{
				display: "flex",
				backgroundColor: `rgb(${props.redValueInput}, ${props.greenValueInput}, ${props.blueValueInput})`,
				width: "100px",
				height: "100px",
			}}
		>
			current color
		</div>
	);
}

export default CurrentColor;
