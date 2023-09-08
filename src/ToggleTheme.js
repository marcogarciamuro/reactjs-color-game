import React, { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import { useTheme } from "./GameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function ToggleTheme() {
	const { setThemeIsDark } = useTheme();
	const [toggleValue, setToggleValue] = useState("1");

	const handleSetLightTheme = () => {
		setToggleValue("0");
		setThemeIsDark(false);
	};
	function handleSetDarkTheme() {
		setToggleValue("1");
		setThemeIsDark(true);
	}

	return (
		<ButtonGroup>
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip> Set Light Theme</Tooltip>}
			>
				<ToggleButton
					key={0}
					id={`radio-${0}`}
					type="radio"
					variant={
						toggleValue === "0"
							? "outline-success"
							: "outline-light"
					}
					name="radio"
					value="0"
					checked={toggleValue === "0"}
					onChange={handleSetLightTheme}
				>
					<FontAwesomeIcon icon={faSun}></FontAwesomeIcon>
				</ToggleButton>
			</OverlayTrigger>
			<OverlayTrigger
				placement="top"
				overlay={<Tooltip> Set Dark Theme</Tooltip>}
			>
				<ToggleButton
					key={1}
					id={`radio-${1}`}
					type="radio"
					variant={
						toggleValue === "1" ? "outline-success" : "outline-dark"
					}
					name="radio"
					value="1"
					checked={toggleValue === "1"}
					onChange={handleSetDarkTheme}
				>
					<FontAwesomeIcon
						icon={faMoon}
						style={{
							color: "black",
						}}
					></FontAwesomeIcon>
				</ToggleButton>
			</OverlayTrigger>
		</ButtonGroup>
	);
}

export default ToggleTheme;
