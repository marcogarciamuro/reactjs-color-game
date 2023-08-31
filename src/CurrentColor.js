import React from "react";
import { useCurrentColor, useGameStatus } from "./GameContext";

function CurrentColor(props) {
	console.log(props);
	const { redValueInput, greenValueInput, blueValueInput } =
		useCurrentColor();
	const { roundEnded } = useGameStatus();
	return (
		<div
			className={`color-block ${
				roundEnded ? "move-block-left" : ""
			} color-text align-items-center px-2`}
			style={{
				backgroundColor: `rgb(${redValueInput}, ${greenValueInput}, ${blueValueInput})`,
			}}
		>
			Current Color
		</div>
	);
}

export default CurrentColor;
