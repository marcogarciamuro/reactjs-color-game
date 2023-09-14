import React, { useEffect } from "react";
import {
	useGameStatus,
	useCurrentColor,
	useRandomColor,
	useAccuracy,
} from "./GameContext";

function ColorDifference() {
	const { redValueInput, greenValueInput, blueValueInput } =
		useCurrentColor();
	const { redValueTarget, greenValueTarget, blueValueTarget } =
		useRandomColor();

	const { roundEnded } = useGameStatus();

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

			const totalAccuracy =
				(redValueAccuracy + greenValueAccuracy + blueValueAccuracy) / 3;

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

	return <div className="mb-2">Accuracy: {accuracy}%</div>;
}

export default ColorDifference;
