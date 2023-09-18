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
	function getThemePreferenceKey() {
		if (localStorage.getItem("theme") === "light") {
			return "0";
		}
		return "1";
	}
	const { setTheme } = useTheme();
	const [toggleValue, setToggleValue] = useState(getThemePreferenceKey());

	const handleSetLightTheme = () => {
		setToggleValue("0");
		setTheme("light");
		localStorage.setItem("theme", "light");
	};
	function handleSetDarkTheme() {
		setToggleValue("1");
		localStorage.setItem("theme", "dark");
		setTheme("dark");
	}

	return (
		<ButtonGroup>
			<OverlayTrigger
				placement="bottom"
				overlay={<Tooltip> Set Light Theme</Tooltip>}
			>
				<ToggleButton
					className="toggle-theme-button"
					key={0}
					id={`radio-${0}`}
					type="radio"
					variant={
						toggleValue === "0" ? "outline-success" : "outline-dark"
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
				placement="bottom"
				overlay={<Tooltip> Set Dark Theme</Tooltip>}
			>
				<ToggleButton
					className="toggle-theme-button"
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
					<FontAwesomeIcon icon={faMoon}></FontAwesomeIcon>
				</ToggleButton>
			</OverlayTrigger>
		</ButtonGroup>
	);
}

export default ToggleTheme;
