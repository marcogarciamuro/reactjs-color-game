import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import RandomColor from "./RandomColor";
import CurrentColor from "./CurrentColor";
import Timer from "./Timer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Slider from "./Slider";
import Button from "react-bootstrap/Button";
import ToggleTheme from "./ToggleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import StatsResetToast from "./StatsResetToast";

import {
	useTimer,
	useCurrentColor,
	useGameStatus,
	useTheme,
} from "./GameContext";
import ColorDifference from "./ColorDifference";
import PlayerStats from "./PlayerStats";
import Footer from "./Footer";

function Home() {
	const { gameStarted, roundEnded, setGameStarted, setRoundEnded } =
		useGameStatus();
	const { initializeTimer } = useTimer();
	const { setRedValueInput, setGreenValueInput, setBlueValueInput } =
		useCurrentColor();
	const { themeIsDark } = useTheme();
	const [showGameStats, setShowGameStats] = useState(false);
	const [bestScore, setBestScore] = useState(null);
	const [averageScore, setAverageScore] = useState(0);
	const [gamesPlayed, setGamesPlayed] = useState(0);
	const [showStatsResetToast, setShowStatsResetToast] = useState(false);

	function resetStats() {
		localStorage.setItem("gamesPlayed", "0");
		localStorage.setItem("bestScore", "0");
		localStorage.setItem("averageScore", "0");
		setGamesPlayed(0);
		setBestScore(0);
		setAverageScore(0);
		handleClose();
		setShowStatsResetToast(true);
	}

	function handleNextRoundButtonClick() {
		initializeTimer();
		setRedValueInput(0);
		setGreenValueInput(0);
		setBlueValueInput(0);
		setRoundEnded(false);
	}

	function handleStartGameButtonClick() {
		initializeTimer();
		setGameStarted(true);
	}

	function handleShow() {
		setShowGameStats(true);
	}

	function handleClose() {
		setShowGameStats(false);
	}

	return (
		<Container
			fluid
			className="d-flex flex-column pt-2 px-4"
			style={{
				backgroundColor: themeIsDark ? "#121212" : "#FFFFFF",
				minHeight: "100vh",
			}}
		>
			<Row
				className="justify-content-between pb-5"
				style={{ height: "101px" }}
			>
				<Col xs="auto" className="ps-0">
					<ToggleTheme />
				</Col>
				<Col xs="auto" className="pe-0">
					{showStatsResetToast ? (
						<StatsResetToast
							show={showStatsResetToast}
							setShow={setShowStatsResetToast}
						/>
					) : (
						<Button onClick={handleShow} variant="outline-primary">
							<FontAwesomeIcon
								icon={faRankingStar}
							></FontAwesomeIcon>
						</Button>
					)}
				</Col>
			</Row>
			<Modal
				// style={{ backgroundColor: "#181a1b" }}
				show={showGameStats}
				onHide={handleClose}
				size="sm"
			>
				<Modal.Header closeButton>
					<Modal.Title>Your game statistics</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<PlayerStats
						bestScore={bestScore}
						setBestScore={setBestScore}
						averageScore={averageScore}
						setAverageScore={setAverageScore}
						gamesPlayed={gamesPlayed}
						setGamesPlayed={setGamesPlayed}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						variant="danger"
						onClick={resetStats}
						className="me-auto"
					>
						Reset Stats
					</Button>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
			<Row>
				<Col className="text-center justify-content-center">
					<h1
						className="mb-3"
						style={{ color: themeIsDark ? "#FFFFFF" : "#121212" }}
					>
						The Color Matching Game
					</h1>
					{gameStarted ? (
						// if round is ongoing
						!roundEnded ? (
							<Container className="px-0">
								<Timer />
								<Row>
									<Col className="d-flex justify-content-end">
										<RandomColor />
									</Col>
									<Col className="d-flex justify-content-start">
										<CurrentColor />
									</Col>
								</Row>
							</Container>
						) : (
							// if round ended
							<Container>
								<Button
									className="mb-4"
									onClick={handleNextRoundButtonClick}
								>
									Next Round
								</Button>
								<ColorDifference />
								<Row>
									<Col className="d-flex justify-content-end">
										<RandomColor />
									</Col>
									<Col className="d-flex justify-content-start">
										<CurrentColor />
									</Col>
								</Row>
							</Container>
						)
					) : (
						// if game is has not started
						<Button
							size="lg"
							id="gradient-box"
							className="mt-5 mb-4"
							onClick={handleStartGameButtonClick}
						>
							Start Game
						</Button>
					)}
					<Container className="py-5">
						<Slider color="red" />
					</Container>
					<Container className="py-5">
						<Slider color="green" />
					</Container>
					<Container className="pt-5 pb-4">
						<Slider color="blue" />
					</Container>
				</Col>
			</Row>
			<div className="flex-grow-1"></div>
			<Footer />
		</Container>
	);
}

export default Home;
