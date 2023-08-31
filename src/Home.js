import React from "react";
import Container from "react-bootstrap/Container";
import RandomColor from "./RandomColor";
import CurrentColor from "./CurrentColor";
import GradientColor from "./GradientColor";
import Timer from "./Timer";
import { useGameStatus } from "./GameContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "./Slider";
import Button from "react-bootstrap/Button";
import { useTimer, useCurrentColor } from "./GameContext";
import ColorDifference from "./ColorDifference";

function Home() {
	const { gameStarted, roundEnded, setGameStarted, setRoundEnded } =
		useGameStatus();
	const { initializeTimer } = useTimer();
	const { setRedValueInput, setGreenValueInput, setBlueValueInput } =
		useCurrentColor();

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
	console.log("Round ended: " + roundEnded);
	return (
		<Container className="flex text-center justify-content-center p-5">
			<h1 className="mb-3">The Color Matching Game</h1>
			{gameStarted ? (
				<Container>
					<div
						style={{
							visibility: roundEnded ? "visible" : "hidden",
						}}
					>
						<Button
							className="mb-3"
							onClick={handleNextRoundButtonClick}
						>
							Next Round
						</Button>
						<ColorDifference />
					</div>
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
				<GradientColor></GradientColor>
			)}
			{!gameStarted && (
				<Button className="mt-5" onClick={handleStartGameButtonClick}>
					Start Game
				</Button>
			)}
			<Slider color="red" />
			<Slider color="green" />
			<Slider color="blue" />
		</Container>
	);
}

export default Home;
