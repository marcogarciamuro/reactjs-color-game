import React from "react";
import { useCurrentColor, useRandomColor } from "./GameContext";

function ColorDifference() {
	const { redValueInput, greenValueInput, blueValueInput } =
		useCurrentColor();
	const { redValueTarget, greenValueTarget, blueValueTarget } =
		useRandomColor();

	function getColorAccuracy(colorValueInput, colorValueTarget) {
		return 1 - Math.abs(colorValueInput - colorValueTarget) / 255;
	}

	const redValueAccuracy = getColorAccuracy(redValueInput, redValueTarget);
	const greenValueAccuracy = getColorAccuracy(
		greenValueInput,
		greenValueTarget
	);
	const blueValueAccuracy = getColorAccuracy(blueValueInput, blueValueTarget);

	console.log("red accuracy: " + redValueAccuracy);
	console.log("green accuracy: " + greenValueAccuracy);
	console.log("blue accuracy: " + blueValueAccuracy);
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

	return <div className="mb-2">Accuracy: {totalAccuracyPercent}%</div>;
}

export default ColorDifference;
