import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const RandomColor = (props) => {
	function rgbToHex(r, g, b) {
		return (
			"#" +
			[r, g, b]
				.map((x) => {
					const hex = x.toString(16);
					return hex.length === 1 ? "0" + hex : hex;
				})
				.join("")
		);
	}

	const getColorValue = () => Math.floor(Math.random() * 256);

	function getNewColorHex() {
		const color = {
			r: getColorValue(),
			g: getColorValue(),
			b: getColorValue(),
		};
		props.setRedValueTarget(color.r);
		props.setGreenValueTarget(color.g);
		props.setBlueValueTarget(color.b);
		return rgbToHex(color.r, color.g, color.b);
	}

	const [colorToMatch, setColorToMatch] = useState();
	useEffect(() => {
		setColorToMatch(getNewColorHex());
	}, []);

	function handleColorChange() {
		setColorToMatch(getNewColorHex());
	}

	return (
		<div>
			{colorToMatch}
			<div
				style={{
					display: "flex",
					backgroundColor: colorToMatch,
					width: "100px",
					height: "100px",
				}}
			></div>
			<Button onClick={() => handleColorChange()}>Change Color</Button>
		</div>
	);
};

export default RandomColor;
