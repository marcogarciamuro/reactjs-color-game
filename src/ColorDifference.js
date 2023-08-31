import React from "react";
import { useCurrentColor, useRandomColor } from "./GameContext";

function ColorDifference() {
	const { redValueInput, greenValueInput, blueValueInput } =
		useCurrentColor();
	const { redValueTarget, greenValueTarget, blueValueTarget } =
		useRandomColor();

	function getColorAccuracy(colorValueInput, colorValueTarget) {
		// solves special case where input and target are both 0,
		// preventing an undefined result from division
		// if (colorValueInput === colorValueTarget) {
		// 	return 1.0;
		// }

		// // if input or target are 0, then perform special formula
		// if (colorValueInput === 0 || colorValueTarget === 0) {
		// 	return 1 - (colorValueInput + colorValueTarget) / 255;
		// }

		// // if neither input or target are 0,
		// // and input is less than target, divide input by target
		// else if (colorValueInput < colorValueTarget) {
		// 	return colorValueInput / colorValueTarget;
		// }

		// // if neither input or target are 0,
		// // and input is greater than target, divide target by input
		// else if (colorValueInput > colorValueTarget) {
		// 	return colorValueTarget / colorValueInput;
		// }
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

	return <div>Accuracy: {totalAccuracyPercent}%</div>;
}

export default ColorDifference;
