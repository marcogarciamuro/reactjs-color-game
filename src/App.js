import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Home";
import Cookies from "js-cookie";
import { GameProvider } from "./GameContext";

function App() {
	const getCookie = () => {
		console.log(Cookies.get("accuracy"));
	};
	const setCookie = () => {
		Cookies.set("accuracy", "100%", { expires: 7 });
	};
	return (
		<GameProvider>
			<Home />
		</GameProvider>
	);
}

export default App;
