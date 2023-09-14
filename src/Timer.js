import React from "react";
import { useTimer } from "./GameContext";

function Timer() {
	const { timer } = useTimer();

	return (
		<h1
			style={{
				fontFamily: "digital-clock-font",
			}}
		>
			{timer}
		</h1>
	);
}

export default Timer;
