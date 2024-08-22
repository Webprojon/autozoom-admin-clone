import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LogIn from "./components/LogIn";
import { useEffect } from "react";
import Header from "./components/Header";
import Settings from "./pages/Settings/Settings";
import Brands from "./pages/Brands/Brands";
import Models from "./pages/Models/Models";
import Locations from "./pages/Locations/Locations";
import Cities from "./pages/Cities/Cities";
import Cars from "./pages/Cars/Cars";

function App() {
	const navigate = useNavigate();
	const userToken = localStorage.getItem("loginToken");
	const location = useLocation();
	const pathname = location.pathname !== "/login";

	useEffect(() => {
		if (userToken?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
			navigate("/locations");
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<section className="bg-gray-50 h-[100vh]">
			{pathname ? <Header /> : null}
			<Routes>
				<Route path="/login" element={<LogIn />} />
				<Route path="/settings" element={<Settings />} />
				<Route path="/brands" element={<Brands />} />
				<Route path="/models" element={<Models />} />
				<Route path="/locations" element={<Locations />} />
				<Route path="/cities" element={<Cities />} />
				<Route path="/cars" element={<Cars />} />
			</Routes>
		</section>
	);
}

export default App;
