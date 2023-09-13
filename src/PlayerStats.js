import React, { useEffect } from "react";
import { useGameStatus, useAccuracy, useStatistics } from "./GameContext";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function PlayerStats() {
	const { roundEnded } = useGameStatus();
	const { accuracy } = useAccuracy();
	const {
		bestScore,
		setBestScore,
		averageScore,
		setAverageScore,
		gamesPlayed,
		setGamesPlayed,
	} = useStatistics();

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
	}, [setAverageScore, setBestScore, setGamesPlayed]);

	return (
		<Container className="pe-0">
			<Row>Best Score: {bestScore === 0 ? "---" : bestScore}%</Row>
			<Row>
				Average Score: {averageScore === 0 ? "---" : averageScore}%
			</Row>
			<Row>Games Played: {gamesPlayed}</Row>
		</Container>
	);
}
export default PlayerStats;
