import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import "./App.css";
import Container from "react-bootstrap/Container";

function Slider(props) {
	return (
		<Container className="p-5">
			<RangeSlider
				id={"range-slider-" + props.color}
				className="custom-range-slider"
				defaultValue={[0, 0]}
				min={0}
				max={255}
				onInput={(value, userInteraction) =>
					props.setColorValueInput(value[1])
				}
				thumbsDisabled={[true, false]}
				rangeSlideDisabled={true}
			/>
		</Container>
	);
}

export default Slider;
