import React, { useEffect, useState } from "react";
import { useGameStatus, useAccuracy, useTheme } from "./GameContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function PlayerStats() {
	const { roundEnded } = useGameStatus();
	const { accuracy } = useAccuracy();
	const { themeIsDark } = useTheme();
	const [bestScore, setBestScore] = useState(null);
	const [averageScore, setAverageScore] = useState(0);
	const [gamesPlayed, setGamesPlayed] = useState(0);

	// update game count
	useEffect(() => {
		if (roundEnded) {
			localStorage.setItem("gamesPlayed", gamesPlayed + 1);
			setGamesPlayed((currentVal) => {
				return currentVal + 1;
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roundEnded]);

	function resetStats() {
		localStorage.setItem("gamesPlayed", "0");
		localStorage.setItem("bestScore", "0");
		localStorage.setItem("averageScore", "0");
		setGamesPlayed(0);
		setBestScore(0);
		setAverageScore(0);
	}

	useEffect(() => {
		if (!roundEnded) {
			return;
		}
		// update accuracy
		if (gamesPlayed === 1) {
			localStorage.setItem("averageScore", `${accuracy}%`);
			setAverageScore(accuracy);
		} else if (gamesPlayed > 1) {
			const currentAverageDecimal = averageScore / 100;
			const newGameScore = accuracy / 100;
			const updatedAverageDecimal =
				(currentAverageDecimal + newGameScore) / gamesPlayed;
			const updatedAveragePercent = Math.round(
				updatedAverageDecimal * 100
			);

			localStorage.setItem("averageScore", `${updatedAveragePercent}`);
			setAverageScore(updatedAveragePercent);
		}

		// update personal best score
		if (gamesPlayed === 1 || (accuracy > bestScore && gamesPlayed > 1)) {
			localStorage.setItem("bestScore", `${accuracy}%`);
			setBestScore(accuracy);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roundEnded, gamesPlayed]);

	useEffect(() => {
		if (localStorage.getItem("averageScore") === null) {
			localStorage.setItem("averageScore", 0);
		}
		if (localStorage.getItem("bestScore") === null) {
			localStorage.setItem("bestScore", 0);
		}
		if (localStorage.getItem("gamesPlayed") === null) {
			localStorage.setItem("gamesPlayed", 0);
		}
		setAverageScore(parseInt(localStorage.getItem("averageScore")));
		setBestScore(parseInt(localStorage.getItem("bestScore")));
		setGamesPlayed(parseInt(localStorage.getItem("gamesPlayed")));
	}, []);

	return (
		<Container className="pe-0">
			<Row
			// style={{
			// 	color: themeIsDark ? "#FFFFFF" : "#121212",
			// }}
			>
				Best Score: {bestScore === 0 ? "---" : bestScore}%
			</Row>
			<Row
			// style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}
			>
				Average Score: {averageScore === 0 ? "---" : averageScore}%
			</Row>
			<Row
			// style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}
			>
				Games Played: <Col xs="auto">{gamesPlayed}</Col>
			</Row>
		</Container>
	);
}
export default PlayerStats;
