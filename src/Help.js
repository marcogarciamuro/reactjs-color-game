import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "./GameContext";

function Help(props) {
	const { theme } = useTheme();
	return (
		<Modal id={theme} show={props.show} onHide={props.onHide}>
			<Modal.Header closeButton>
				<Modal.Title className="ms-auto">
					How to play{" "}
					<FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>
					Colors are represented by a combination of red, green, and
					blue values ranging from 0 to 255
				</p>
				<p>
					Move the Red, Blue, and Green sliders to create a
					combination that will match the target color
				</p>
				<p>
					It's a race against time! Keep an eye on the clock as you
					try to cook up an exact match
				</p>
				<p>Have fun!</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.onHide}>
					Got it
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Help;
