import { useNavigate } from "react-router-dom";

export default function Home() {
	const navigate = useNavigate();

	const logOut = () => {
		setTimeout(() => {
			localStorage.removeItem("loginToken");
			navigate("/");
		}, 1200);
	};

	return (
		<section className="m-16 text-center">
			<h2 className="font-bold text-[38px]">This is home page !</h2>
			<button
				onClick={logOut}
				className="mt-4 bg-red-400 hover:bg-red-500 hover:scale-105 active:scale-100 transition-all py-2 px-6 text-white font-semibold rounded-lg"
			>
				Log out
			</button>
		</section>
	);
}
