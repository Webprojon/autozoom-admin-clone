import Home from "./pages/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LogIn from "./components/LogIn";
import { useEffect } from "react";
import Categories from "./pages/Categories";
import Header from "./components/Header";
import Settings from "./pages/Settings";

function App() {
	const navigate = useNavigate();
	const userToken = localStorage.getItem("loginToken");
	const location = useLocation();
	const pathname = location.pathname !== "/login";

	useEffect(() => {
		if (userToken?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
			navigate("/dashboard");
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<section className="bg-gray-300 h-[100vh]">
			{pathname ? <Header /> : null}
			<Routes>
				<Route path="/login" element={<LogIn />} />
				<Route path="/dashboard" element={<Home />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</section>
	);
}

export default App;
