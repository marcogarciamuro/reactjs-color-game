import React from "react";
import { useCurrentColor, useGameStatus } from "./GameContext";

function CurrentColor(props) {
	const { redValueInput, greenValueInput, blueValueInput } =
		useCurrentColor();
	const { roundEnded } = useGameStatus();
	return (
		<div>
			{!roundEnded && (
				<div className="color-block-label">Current Color</div>
			)}
			<div
				className={`color-block ${
					roundEnded ? "move-block-left" : ""
				} color-text align-items-center px-2`}
				style={{
					backgroundColor: `rgb(${redValueInput}, ${greenValueInput}, ${blueValueInput})`,
				}}
			></div>
		</div>
	);
}

export default CurrentColor;
