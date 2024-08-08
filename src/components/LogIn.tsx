import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const LogInBek = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const response = await fetch(
				"https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",
				{
					method: "POST",
					body: JSON.stringify({
						phone_number: phoneNumber,
						password: password,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			const res = await response.json();

			if (res.success) {
				const logintoken = res?.data?.tokens?.accessToken?.token;
				localStorage.setItem("loginToken", logintoken);
				toast.success("Successfully logged in!");
				setTimeout(() => {
					navigate("/");
				}, 1200);
				setPhoneNumber("");
				setPassword("");
			} else {
				toast.error(res.message);
			}
		} catch (error) {
			toast.error("An error occurred!");
		}
	};

	return (
		<div className="absolute top-[18rem] left-1/2 -translate-y-1/2 -translate-x-1/2">
			<form
				onSubmit={LogInBek}
				className="border-2 bg-slate-700 flex flex-col justify-center gap-y-5 h-[40vh] w-[400px] rounded-lg p-6 font-medium text-slate-200 tracking-wider"
			>
				<input
					type="text"
					required
					value={phoneNumber}
					placeholder="Phone number"
					onChange={(e) => setPhoneNumber(e.target.value)}
					className="outline-none py-3 px-4 bg-slate-600 rounded-lg placeholder:text-slate-200"
				/>
				<input
					required
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="outline-none py-3 px-4 bg-slate-600 rounded-lg placeholder:text-slate-200"
				/>
				<button className="bg-slate-400 hover:bg-slate-500 transition-all py-3 px-4 text-white rounded-lg">
					Log in
				</button>
			</form>
		</div>
	);
}
