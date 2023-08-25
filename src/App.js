import Slider from "./Slider";
import RandomColor from "./RandomColor";
import CurrentColor from "./CurrentColor";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
	const [redValueInput, setRedValueInput] = useState(0);
	const [greenValueInput, setGreenValueInput] = useState(0);
	const [blueValueInput, setBlueValueInput] = useState(0);

	const [redValueTarget, setRedValueTarget] = useState(0);
	const [greenValueTarget, setGreenValueTarget] = useState(0);
	const [blueValueTarget, setBlueValueTarget] = useState(0);
	console.log(
		"red goal: " + redValueTarget + ", red input: " + redValueInput
	);
	console.log(
		"green goal: " + greenValueTarget + ", green input: " + greenValueInput
	);
	console.log(
		"blue goal: " + blueValueTarget + ", blue input: " + blueValueInput
	);

	return (
		<div className="App">
			<RandomColor
				setRedValueTarget={setRedValueTarget}
				setGreenValueTarget={setGreenValueTarget}
				setBlueValueTarget={setBlueValueTarget}
			/>
			<CurrentColor
				redValueInput={redValueInput}
				greenValueInput={greenValueInput}
				blueValueInput={blueValueInput}
			/>
			<Slider color="red" setColorValueInput={setRedValueInput} />
			<Slider color="green" setColorValueInput={setGreenValueInput} />
			<Slider color="blue" setColorValueInput={setBlueValueInput} />
		</div>
	);
}

export default App;
