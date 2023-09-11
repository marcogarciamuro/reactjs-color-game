import React from "react";
import Container from "react-bootstrap/Container";
import RandomColor from "./RandomColor";
import CurrentColor from "./CurrentColor";
import GradientColor from "./GradientColor";
import Timer from "./Timer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "./Slider";
import Button from "react-bootstrap/Button";
import ToggleTheme from "./ToggleTheme";

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

	return (
		<Container
			fluid
			className="pt-2 px-4"
			style={{
				backgroundColor: themeIsDark ? "#121212" : "#FFFFFF",
				minHeight: "100vh",
			}}
		>
			<Row className="justify-content-between">
				<Col xs="auto" className="ps-0">
					<ToggleTheme />
				</Col>
				<Col xs="auto" className="pe-0">
					<PlayerStats />
				</Col>
			</Row>

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
							<Container>
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
								<div
									style={{
										visibility: roundEnded
											? "visible"
											: "hidden",
									}}
								>
									<Button
										className="mb-2"
										onClick={handleNextRoundButtonClick}
									>
										Next Round
									</Button>
									<ColorDifference />
								</div>
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
						<GradientColor></GradientColor>
					)}
					{!gameStarted && (
						<Button
							className="mt-5"
							onClick={handleStartGameButtonClick}
						>
							Start Game
						</Button>
					)}
					<Slider color="red" />
					<Slider color="green" />
					<Slider color="blue" />
				</Col>
			</Row>
			<Footer />
		</Container>
	);
}

export default Home;
