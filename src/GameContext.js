import React, { useContext, useState, useRef, useEffect } from "react";

const GameStatusContext = React.createContext();
const RandomColorContext = React.createContext();
const CurrentColorContext = React.createContext();
const TimerContext = React.createContext();
const ThemeContext = React.createContext();
const AccuracyContext = React.createContext();
export function useAccuracy() {
	return useContext(AccuracyContext);
}

export function useTimer() {
	return useContext(TimerContext);
}

export function useGameStatus() {
	return useContext(GameStatusContext);
}

export function useRandomColor() {
	return useContext(RandomColorContext);
}

export function useCurrentColor() {
	return useContext(CurrentColorContext);
}

export function useTheme() {
	return useContext(ThemeContext);
}

export function GameProvider({ children }) {
	const [gameStarted, setGameStarted] = useState(false);
	const [timer, setTimer] = useState("00:15");
	const [accuracy, setAccuracy] = useState();

	const Ref = useRef(null);
	function getTimeRemaining(e) {
		const total = Date.parse(e) - Date.parse(new Date());
		const seconds = Math.floor((total / 1000) % 60);
		const minutes = Math.floor((total / 1000 / 60) % 60);
		return {
			total,
			minutes,
			seconds,
		};
	}

	function startTimer(e) {
		let { total, minutes, seconds } = getTimeRemaining(e);
		if (total >= 0) {
			setTimer(
				(minutes > 9 ? minutes : "0" + minutes) +
					":" +
					(seconds > 9 ? seconds : "0" + seconds)
			);
		}
	}

	function clearTimer(e) {
		setTimer("00:15");
		if (Ref.current) clearInterval(Ref.current);
		const id = setInterval(() => {
			startTimer(e);
		}, 1000);
		Ref.current = id;
	}

	function getDeadTime() {
		let deadline = new Date();
		deadline.setSeconds(deadline.getSeconds() + 15);
		return deadline;
	}

	function initializeTimer() {
		clearTimer(getDeadTime());
	}

	const [redValueInput, setRedValueInput] = useState(0);
	const [greenValueInput, setGreenValueInput] = useState(0);
	const [blueValueInput, setBlueValueInput] = useState(0);

	const [redValueTarget, setRedValueTarget] = useState(0);
	const [greenValueTarget, setGreenValueTarget] = useState(0);
	const [blueValueTarget, setBlueValueTarget] = useState(0);

	const [roundEnded, setRoundEnded] = useState(false);

	const [themeIsDark, setThemeIsDark] = useState(true);

	useEffect(() => {
		if (timer === "00:00") {
			setRoundEnded(true);
		}
	}, [timer]);

	return (
		<ThemeContext.Provider
			value={{
				themeIsDark,
				setThemeIsDark,
			}}
		>
			<GameStatusContext.Provider
				value={{
					gameStarted,
					roundEnded,
					setGameStarted,
					setRoundEnded,
				}}
			>
				<TimerContext.Provider value={{ timer, initializeTimer }}>
					<AccuracyContext.Provider value={{ accuracy, setAccuracy }}>
						<CurrentColorContext.Provider
							value={{
								redValueInput,
								greenValueInput,
								blueValueInput,
								setRedValueInput,
								setGreenValueInput,
								setBlueValueInput,
							}}
						>
							<RandomColorContext.Provider
								value={{
									redValueTarget,
									greenValueTarget,
									blueValueTarget,
									setRedValueTarget,
									setGreenValueTarget,
									setBlueValueTarget,
								}}
							>
								{children}
							</RandomColorContext.Provider>
						</CurrentColorContext.Provider>
					</AccuracyContext.Provider>
				</TimerContext.Provider>
			</GameStatusContext.Provider>
		</ThemeContext.Provider>
	);
}
