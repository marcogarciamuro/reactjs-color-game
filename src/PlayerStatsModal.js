import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PlayerStats from "./PlayerStats";
import { useStatistics } from "./GameContext";
import { useTheme } from "./GameContext";

function PlayerStatsModal(props) {
	const { setGamesPlayed, setBestScore, setAverageScore } = useStatistics();
	const { theme } = useTheme();
	function resetStats() {
		localStorage.setItem("gamesPlayed", "0");
		localStorage.setItem("bestScore", "0");
		localStorage.setItem("averageScore", "0");
		setGamesPlayed(0);
		setBestScore(0);
		setAverageScore(0);
		props.handleClose();
		props.setShowStatsResetToast(true);
	}
	return (
		<Modal id={theme} show={props.show} onHide={props.handleClose} size="sm">
			<Modal.Header closeButton>
				<Modal.Title>Your game statistics</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<PlayerStats />
			</Modal.Body>
			<Modal.Footer>
				<Button variant="danger" onClick={resetStats} className="me-auto">
					Reset Stats
				</Button>
				<Button variant="secondary" onClick={props.handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default PlayerStatsModal;
