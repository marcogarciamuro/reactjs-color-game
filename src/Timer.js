import React from "react";
import { useTimer, useTheme } from "./GameContext";

function Timer() {
	const { timer } = useTimer();
	const { themeIsDark } = useTheme();

	return (
		<h1
			style={{
				fontFamily: "digital-clock-font",
				color: themeIsDark ? "#FFFFFF" : "#121212",
			}}
		>
			{timer}
		</h1>
	);
}

export default Timer;
