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
		if (roundEnded) {
			// update accuracy
			if (gamesPlayed === 1) {
				console.log("SIMPLE CASE");
				console.log("gamesPlayed: " + gamesPlayed);
				localStorage.setItem("averageScore", `${accuracy}%`);
				setAverageScore(accuracy);
			} else if (gamesPlayed > 1) {
				console.log("gamesPlayed 2nd: " + gamesPlayed);
				const currentAverageDecimal = averageScore / 100;
				const newGameScore = accuracy / 100;
				const updatedAverageDecimal =
					(currentAverageDecimal + newGameScore) / gamesPlayed;
				const updatedAveragePercent = Math.round(
					updatedAverageDecimal * 100
				);

				console.log("updated average decimal" + updatedAverageDecimal);
				console.log(`current average = ${averageScore / 100}`);
				console.log(`current accuracy = ${accuracy / 100}`);

				localStorage.setItem(
					"averageScore",
					`${updatedAveragePercent}`
				);
				setAverageScore(updatedAveragePercent);
			}

			// update personal best score
			if (
				gamesPlayed === 1 ||
				(accuracy > bestScore && gamesPlayed > 1)
			) {
				console.log("games: " + gamesPlayed);
				console.log("setting bestscore");
				localStorage.setItem("bestScore", `${accuracy}%`);
				setBestScore(accuracy);
			}
		}
	}, [roundEnded, gamesPlayed]);

	useEffect(() => {
		console.log(localStorage.getItem("averageScore"));
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
				style={{
					color: themeIsDark ? "#FFFFFF" : "#121212",
				}}
			>
				<Col xs="auto" className="px-0 text-end">
					Best Score:
				</Col>
				<Col xs="auto">{bestScore === 0 ? "---" : bestScore}%</Col>
			</Row>
			<Row style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}>
				<Col xs="auto" className="px-0 text-end">
					Average Score:{" "}
				</Col>
				<Col xs="auto">
					{averageScore === 0 ? "---" : averageScore}%
				</Col>
			</Row>
			<Row style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}>
				<Col xs="auto" className="px-0 text-end">
					Games Played:{" "}
				</Col>
				<Col xs="auto">{gamesPlayed}</Col>
			</Row>
			<Row className="pt-2 pb-4 pb-sm-4 pb-md-2 pb-lg-0">
				<Col className="ps-0">
					<Button
						size="sm"
						variant="outline-primary"
						onClick={resetStats}
					>
						Reset Stats
					</Button>
				</Col>
			</Row>
		</Container>
	);
}
export default PlayerStats;
