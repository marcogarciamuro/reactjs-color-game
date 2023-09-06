import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import { GameProvider } from "./GameContext";

function App() {
	return (
		<GameProvider>
			<Home />
		</GameProvider>
	);
}

export default App;
