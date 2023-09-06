import React, { useEffect } from "react";
import {
	useGameStatus,
	useCurrentColor,
	useRandomColor,
	useTheme,
	useAccuracy,
} from "./GameContext";

function ColorDifference() {
	const { redValueInput, greenValueInput, blueValueInput } =
		useCurrentColor();
	const { redValueTarget, greenValueTarget, blueValueTarget } =
		useRandomColor();

	const { roundEnded } = useGameStatus();

	const { themeIsDark } = useTheme();
	const { accuracy, setAccuracy } = useAccuracy();

	function getColorAccuracy(colorValueInput, colorValueTarget) {
		return 1 - Math.abs(colorValueInput - colorValueTarget) / 255;
	}

	useEffect(() => {
		if (roundEnded) {
			const redValueAccuracy = getColorAccuracy(
				redValueInput,
				redValueTarget
			);
			const greenValueAccuracy = getColorAccuracy(
				greenValueInput,
				greenValueTarget
			);
			const blueValueAccuracy = getColorAccuracy(
				blueValueInput,
				blueValueTarget
			);

			console.log(
				"red input: " + redValueInput,
				"-- red target: " + redValueTarget
			);
			console.log(
				"green input: " + greenValueInput,
				"-- green target: " + greenValueTarget
			);
			console.log(
				"blue input: " + blueValueInput,
				"-- blue target: " + blueValueTarget
			);

			const totalAccuracy =
				(redValueAccuracy + greenValueAccuracy + blueValueAccuracy) / 3;

			console.log("total accuracy" + totalAccuracy);

			const totalAccuracyPercent = Math.round(totalAccuracy * 100);
			setAccuracy(totalAccuracyPercent);
		}
	}, [
		blueValueInput,
		blueValueTarget,
		greenValueInput,
		greenValueTarget,
		redValueInput,
		redValueTarget,
		roundEnded,
		setAccuracy,
	]);

	return (
		<div
			className="mb-2"
			style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}
		>
			Accuracy: {accuracy}%
		</div>
	);
}

export default ColorDifference;
