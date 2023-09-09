import { useState, useEffect } from "react";
import { useRandomColor, useTimer, useGameStatus } from "./GameContext";

function RandomColor() {
	const { setRedValueTarget, setGreenValueTarget, setBlueValueTarget } =
		useRandomColor();

	const { roundEnded } = useGameStatus();
	const { timer } = useTimer();
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

	const [colorToMatch, setColorToMatch] = useState();

	useEffect(() => {
		function getNewColorHex() {
			const color = {
				r: getColorValue(),
				g: getColorValue(),
				b: getColorValue(),
			};
			setRedValueTarget(color.r);
			setGreenValueTarget(color.g);
			setBlueValueTarget(color.b);
			return rgbToHex(color.r, color.g, color.b);
		}
		if (timer === "00:30") setColorToMatch(getNewColorHex());
	}, [timer, setBlueValueTarget, setGreenValueTarget, setRedValueTarget]);

	return (
		<div>
			{!roundEnded && <div>Target Color</div>}
			<div
				className={`color-block ${
					roundEnded ? "move-block-right" : ""
				} align-items-center px-2`}
				style={{
					backgroundColor: colorToMatch,
				}}
			></div>
		</div>
	);
}

export default RandomColor;
