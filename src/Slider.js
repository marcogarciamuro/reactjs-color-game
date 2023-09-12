import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./App.css";
import { useCurrentColor, useGameStatus } from "./GameContext";
import Container from "react-bootstrap/Container";

function Slider(props) {
	const {
		redValueInput,
		greenValueInput,
		blueValueInput,
		setRedValueInput,
		setGreenValueInput,
		setBlueValueInput,
	} = useCurrentColor();

	let colorValueInput;
	if (props.color === "red") {
		colorValueInput = redValueInput;
	} else if (props.color === "green") {
		colorValueInput = greenValueInput;
	} else if (props.color === "blue") {
		colorValueInput = blueValueInput;
	}

	const { roundEnded } = useGameStatus();

	function setColorValueInput(colorValue) {
		if (props.color === "red") {
			setRedValueInput(colorValue);
		} else if (props.color === "green") {
			setGreenValueInput(colorValue);
		} else if (props.color === "blue") {
			setBlueValueInput(colorValue);
		}
	}

	return (
		<RangeSlider
			id={"range-slider-" + props.color}
			disabled={roundEnded}
			className="custom-range-slider"
			min={0}
			max={255}
			value={[0, colorValueInput]}
			onInput={(value) => setColorValueInput(value[1])}
			thumbsDisabled={[true, roundEnded]}
			rangeSlideDisabled={true}
		/>
	);
}

export default Slider;
