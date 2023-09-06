import React, { useEffect, useState } from "react";
import { useGameStatus, useAccuracy, useTheme } from "./GameContext";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function PlayerStats() {
	const { roundEnded } = useGameStatus();
	const { accuracy } = useAccuracy();
	const { themeIsDark } = useTheme();
	const [bestScore, setBestScore] = useState();
	const [averageScore, setAverageScore] = useState();
	const [gamesPlayed, setGamesPlayed] = useState();
	useEffect(() => {
		if (roundEnded) {
			// update game count
			const updatedGamesPlayed =
				parseInt(localStorage.getItem("gamesPlayed")) + 1;
			localStorage.setItem("gamesPlayed", `${updatedGamesPlayed}`);
			setGamesPlayed(updatedGamesPlayed);
		}
	}, [roundEnded]);
	function resetStats() {
		localStorage.setItem("gamesPlayed", "0");
		localStorage.setItem("bestScore", "---");
		localStorage.setItem("averageScore", "---");
		setGamesPlayed(0);
		setBestScore("---");
		setAverageScore("---");
	}

	useEffect(() => {
		if (roundEnded) {
			// update accuracy
			if (gamesPlayed === 1) {
				console.log("SIMPLE CASE");
				localStorage.setItem("averageScore", `${accuracy}%`);
				setAverageScore(accuracy);
			} else {
				const updatedAverage = Math.round(
					(averageScore / 100 + accuracy / 100 / gamesPlayed) * 100
				);
				localStorage.setItem("averageScore", `${updatedAverage}`);
			}

			// update personal best score
			if (gamesPlayed === 1 || accuracy > parseInt(bestScore)) {
				localStorage.setItem("bestScore", `${accuracy}%`);
				setBestScore(accuracy);
			}
		}
	}, [accuracy, roundEnded, gamesPlayed, bestScore, averageScore]);

	useEffect(() => {
		if (localStorage.getItem("averageScore") == null) {
			localStorage.setItem("averageScore", "---");
			setAverageScore("---");
		}
		if (localStorage.getItem("gamesPlayed") == null) {
			localStorage.setItem("gamesPlayed", "0");
			setGamesPlayed(0);
		}
		if (localStorage.getItem("bestScore") == null) {
			localStorage.setItem("bestScore", "---");
			setBestScore("---");
		}
	}, []);

	return (
		<div>
			<Row style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}>
				Best Score: {bestScore}%
			</Row>
			<Row style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}>
				Average Score: {averageScore}%
			</Row>
			<Row style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}>
				Games Played: {gamesPlayed}
			</Row>
			<Button onClick={resetStats}>Reset Stats</Button>
		</div>
	);
}
export default PlayerStats;
