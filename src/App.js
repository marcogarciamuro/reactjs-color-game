import Slider from "./Slider";
import RandomColor from "./RandomColor";
import CurrentColor from "./CurrentColor";
import GradientColor from "./GradientColor";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [redValueInput, setRedValueInput] = useState(0);
	const [greenValueInput, setGreenValueInput] = useState(0);
	const [blueValueInput, setBlueValueInput] = useState(0);

	const [redValueTarget, setRedValueTarget] = useState(0);
	const [greenValueTarget, setGreenValueTarget] = useState(0);
	const [blueValueTarget, setBlueValueTarget] = useState(0);

	const [gameStarted, setGameStarted] = useState(false);

	console.log(
		"red goal: " + redValueTarget + ", red input: " + redValueInput
	);
	console.log(
		"green goal: " + greenValueTarget + ", green input: " + greenValueInput
	);
	console.log(
		"blue goal: " + blueValueTarget + ", blue input: " + blueValueInput
	);
	console.log(gameStarted);

	return (
		<Container className="text-center justify-content-center p-5">
			<h1 className="mb-5">The Color Matching Game</h1>
			{gameStarted ? (
				<Row>
					<Col>
						<RandomColor
							gameStarted={gameStarted}
							setRedValueTarget={setRedValueTarget}
							setGreenValueTarget={setGreenValueTarget}
							setBlueValueTarget={setBlueValueTarget}
						/>
					</Col>
					<CurrentColor
						redValueInput={redValueInput}
						greenValueInput={greenValueInput}
						blueValueInput={blueValueInput}
					/>
				</Row>
			) : (
				<GradientColor></GradientColor>
			)}
			{!gameStarted && (
				<Button className="mt-5" onClick={() => setGameStarted(true)}>
					Start Game
				</Button>
			)}
			<Slider color="red" setColorValueInput={setRedValueInput} />
			<Slider color="green" setColorValueInput={setGreenValueInput} />
			<Slider color="blue" setColorValueInput={setBlueValueInput} />
		</Container>
	);
}

export default App;
