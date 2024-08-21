import { IoSettingsOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoLogoModelS } from "react-icons/io";
import { FaStore } from "react-icons/fa";
import { BiSolidCity } from "react-icons/bi";
import { PiNotebookBold } from "react-icons/pi";
import { GrMapLocation } from "react-icons/gr";
import { useGlobalContext } from "../context/global-context";

export default function Header() {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname;
	const { setLoader } = useGlobalContext();

	const logOut = () => {
		setTimeout(() => {
			localStorage.removeItem("loginToken");
			navigate("/login");
		}, 1200);
	};

	const handleLoader = () => {
		setLoader(true);
		setTimeout(() => {
			setLoader(false);
		}, 500);
	};

	const links = [
		{
			to: "/settings",
			icon: <IoSettingsOutline className="size-5" />,
			label: "Settings",
		},
		{ to: "/brands", icon: <FaStore className="size-5" />, label: "Brands" },
		{
			to: "/models",
			icon: <PiNotebookBold className="size-5" />,
			label: "Models",
		},
		{
			to: "/locations",
			icon: <GrMapLocation className="size-5" />,
			label: "Locations",
		},
		{
			to: "/cities",
			icon: <BiSolidCity className="size-5" />,
			label: "Cities",
		},
		{ to: "/cars", icon: <IoLogoModelS className="size-5" />, label: "Cars" },
	];

	return (
		<header className="z-[999]">
			<nav className="flex justify-between items-center px-6 bg-slate-800 h-[9vh] border-b border-gray-600 text-slate-300 font-semibold text-[20px]">
				<h2>Avto Rent Admin</h2>
				<button onClick={logOut}>Log out</button>
			</nav>

			<aside
				className={`pt-2 z-10 fixed left-0 bg-slate-800 min-h-screen w-[17rem] transition-transform duration-200 
      font-semibold tracking-wider text-slate-300 space-y-2`}
			>
				{links.map((link, index) => (
					<Link
						key={index}
						to={link.to}
						onClick={handleLoader}
						className={`flex items-center gap-x-3 py-2 hover:text-slate-400 px-3 mx-3 rounded-md
							${pathname === link.to ? "bg-slate-700" : ""}`}
					>
						{link.icon}
						{link.label}
					</Link>
				))}
			</aside>
		</header>
	);
}
