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
					navigate("/home");
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
		<form
			onSubmit={LogInBek}
			className="border-2 border-sky-600 flex flex-col gap-y-5 w-[340px] mx-auto mt-20 rounded-lg p-6"
		>
			<input
				type="text"
				placeholder="Phone number"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				className="outline-none py-3 px-4 bg-gray-200 rounded-lg"
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className="outline-none py-3 px-4 bg-gray-200 rounded-lg"
			/>
			<button className="bg-sky-400 hover:bg-sky-500 hover:scale-105 active:scale-100 transition-all py-3 px-4 text-white font-semibold rounded-lg">
				Log in
			</button>
		</form>
	);
}
