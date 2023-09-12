import React, { useEffect } from "react";
import { useGameStatus, useAccuracy } from "./GameContext";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

function PlayerStats(props) {
	const { roundEnded } = useGameStatus();
	const { accuracy } = useAccuracy();

	// update game count
	useEffect(() => {
		if (roundEnded) {
			localStorage.setItem("gamesPlayed", props.gamesPlayed + 1);
			props.setGamesPlayed((currentVal) => {
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
		if (props.gamesPlayed === 1) {
			localStorage.setItem("averageScore", `${accuracy}%`);
			props.setAverageScore(accuracy);
		} else if (props.gamesPlayed > 1) {
			const currentAverageDecimal = props.averageScore / 100;
			const newGameScore = accuracy / 100;
			const updatedAverageDecimal =
				(currentAverageDecimal + newGameScore) / props.gamesPlayed;
			const updatedAveragePercent = Math.round(
				updatedAverageDecimal * 100
			);

			localStorage.setItem("averageScore", `${updatedAveragePercent}`);
			props.setAverageScore(updatedAveragePercent);
		}

		// update personal best score
		if (
			props.gamesPlayed === 1 ||
			(accuracy > props.bestScore && props.gamesPlayed > 1)
		) {
			localStorage.setItem("bestScore", `${accuracy}%`);
			props.setBestScore(accuracy);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [roundEnded, props.gamesPlayed]);

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
		props.setAverageScore(parseInt(localStorage.getItem("averageScore")));
		props.setBestScore(parseInt(localStorage.getItem("bestScore")));
		props.setGamesPlayed(parseInt(localStorage.getItem("gamesPlayed")));
	}, [props]);

	return (
		<Container className="pe-0">
			<Row
			// style={{
			// 	color: themeIsDark ? "#FFFFFF" : "#121212",
			// }}
			>
				Best Score: {props.bestScore === 0 ? "---" : props.bestScore}%
			</Row>
			<Row
			// style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}
			>
				Average Score:{" "}
				{props.averageScore === 0 ? "---" : props.averageScore}%
			</Row>
			<Row
			// style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}
			>
				Games Played: {props.gamesPlayed}
			</Row>
		</Container>
	);
}
export default PlayerStats;
