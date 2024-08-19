import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import LogIn from "./components/LogIn";
import { useEffect } from "react";
import Header from "./components/Header";
import Settings from "./pages/Settings";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import Locations from "./pages/Locations";
import Cities from "./pages/Cities";
import Cars from "./pages/Cars";
import AddModal from "./components/Add";
import { useGlobalContext } from "./context/global-context";
import UpdateModal from "./components/Update-Modal";

function App() {
	const { addTaskModal, updateTaskModal } = useGlobalContext();
	const navigate = useNavigate();
	const userToken = sessionStorage.getItem("loginToken");
	const location = useLocation();
	const pathname = location.pathname !== "/login";

	useEffect(() => {
		if (userToken?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
			navigate("/settings");
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
			{addTaskModal ? <AddModal /> : null}
			{updateTaskModal ? <UpdateModal /> : null}
		</section>
	);
}

export default App;
