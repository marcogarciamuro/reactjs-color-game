import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import RandomColor from "./RandomColor";
import CurrentColor from "./CurrentColor";
import Timer from "./Timer";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Slider from "./Slider";
import Button from "react-bootstrap/Button";
import ToggleTheme from "./ToggleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import StatsResetToast from "./StatsResetToast";
import Help from "./Help";

import {
	useTimer,
	useCurrentColor,
	useGameStatus,
	useTheme,
} from "./GameContext";
import ColorDifference from "./ColorDifference";
import Footer from "./Footer";
import PlayerStatsModal from "./PlayerStatsModal";

function Home() {
	const { theme } = useTheme();
	const { gameStarted, roundEnded, setGameStarted, setRoundEnded } =
		useGameStatus();
	const { initializeTimer } = useTimer();
	const { setRedValueInput, setGreenValueInput, setBlueValueInput } =
		useCurrentColor();
	const [showGameStatsModal, setShowGameStatsModal] = useState(false);
	const [showStatsResetToast, setShowStatsResetToast] = useState(false);
	const [showGameRules, setShowGameRules] = useState(false);
	const [colorToMatch, setColorToMatch] = useState();

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

	function handleShowGameStatsModal() {
		setShowGameStatsModal(true);
	}

	function handleCloseGameStatsModal() {
		setShowGameStatsModal(false);
	}

	return (
		<Container
			fluid
			id={theme}
			className="d-flex flex-column pt-2 px-4"
			style={{
				minHeight: "100vh",
			}}
		>
			<Help show={showGameRules} onHide={() => setShowGameRules(false)} />
			<PlayerStatsModal
				show={showGameStatsModal}
				handleClose={handleCloseGameStatsModal}
				setShowStatsResetToast={setShowStatsResetToast}
			/>
			<Row
				className="justify-content-between pb-5"
				style={{ height: "85px" }}
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
						<Button
							onClick={handleShowGameStatsModal}
							variant="warning"
						>
							<FontAwesomeIcon
								icon={faRankingStar}
							></FontAwesomeIcon>
						</Button>
					)}
				</Col>
			</Row>

			<Row>
				<Col className="text-center justify-content-center">
					<h1 className="mb-3">The Color Matching Game</h1>
					{gameStarted ? (
						// if round is ongoing
						!roundEnded ? (
							<Container
								className="px-0"
								style={{
									height: "170px",
								}}
							>
								<Timer />
								<Row>
									<Col className="d-flex justify-content-end">
										<RandomColor
											colorToMatch={colorToMatch}
											setColorToMatch={setColorToMatch}
										/>
									</Col>
									<Col className="d-flex justify-content-start">
										<CurrentColor />
									</Col>
								</Row>
							</Container>
						) : (
							// if round ended
							<Container
								style={{
									height: "170px",
								}}
							>
								<Button
									className="mb-2"
									onClick={handleNextRoundButtonClick}
								>
									Next Round
								</Button>
								<ColorDifference />
								<Row>
									<Col className="d-flex justify-content-end">
										<RandomColor
											colorToMatch={colorToMatch}
											setColorToMatch={setColorToMatch}
										/>
									</Col>
									<Col className="d-flex justify-content-start">
										<CurrentColor />
									</Col>
								</Row>
							</Container>
						)
					) : (
						// if game is has not started
						<Container
							className="d-grid gap-4"
							style={{
								height: "170px",
								display: "flex",
								flexDirection: "column",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Row className="align-self-end">
								<Col>
									<Button
										size="lg"
										id="start-game-button"
										onClick={handleStartGameButtonClick}
										variant="danger"
									>
										Start Game
									</Button>
								</Col>
							</Row>
							<Row className="align-self-start">
								<Col>
									<Button
										id="help-button"
										variant="info"
										onClick={() => setShowGameRules(true)}
									>
										How To Play
									</Button>
								</Col>
							</Row>
						</Container>
					)}
					{/* RGB Sliders */}
					<Container className="pt-4 pb-5 py-sm-5">
						<Slider color="red" />
					</Container>
					<Container className="py-4 py-sm-5">
						<Slider color="green" />
					</Container>
					<Container className="pt-5 pb-3 pb-sm-4">
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
