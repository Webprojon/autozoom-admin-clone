import Home from "./Home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import LogIn from "./LogIn/LogIn";
import { useEffect } from "react";

function App() {
	const navigate = useNavigate();
	const userToken = localStorage.getItem("loginToken");

	useEffect(() => {
		if (userToken?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
			navigate("/home");
		} else {
			navigate("/");
		}
	}, []);

	return (
		<section>
			<Routes>
				<Route path="/" element={<LogIn />} />
				<Route path="/home" element={<Home />} />
			</Routes>
		</section>
	);
}

export default App;
