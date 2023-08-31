import React from "react";
import { useTimer } from "./GameContext";

function Timer() {
	const { timer, initializeTimer } = useTimer();

	return <h2 style={{ fontFamily: "digital-clock-font" }}>{timer}</h2>;
}

export default Timer;
