import { useState } from "react";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoChevronDown, IoChevronUp, IoSettingsSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { MdAccountBox } from "react-icons/md";
import { IoMdHome } from "react-icons/io";
import { BiCategory } from "react-icons/bi";

export default function Header() {
	const [toggleMenu, setToggleMenu] = useState<boolean>(false);
	const navigate = useNavigate();

	const logOut = () => {
		setTimeout(() => {
			localStorage.removeItem("loginToken");
			navigate("/login");
		}, 1200);
	};

	const handleToggleNav = () => {
		setToggleMenu(!toggleMenu);
	};

	//${isVisible ? "translate-x-0" : "-translate-x-full"}
	return (
		<header className="z-[999]">
			<nav className="flex justify-between items-center px-6 bg-slate-700 h-[11vh] border-b border-gray-600 text-slate-400 font-bold text-[20px]">
				<h2>CRUD APP</h2>
				<button onClick={logOut}>Log out</button>
			</nav>

			<aside
				className={`pt-2 z-10 fixed left-0 bg-slate-700 min-h-screen w-[18rem] transition-transform duration-200 
					font-semibold tracking-wider text-slate-400 md:translate-x-0`}
			>
				<Link
					to="/dashboard"
					className="flex items-center gap-x-3 text-lg py-[.6rem] hover:bg-slate-800 px-3 my-1 mx-3 rounded-md"
				>
					<IoMdHome className="size-6" />
					Dashboard
				</Link>
				<Link
					to="/categories"
					className="flex items-center gap-x-3 text-lg py-[.6rem] hover:bg-slate-800 px-3 my-1 mx-3 rounded-md"
				>
					<BiCategory className="size-5" />
					Categories
				</Link>
				<div className="my-4 border-b border-gray-600 dark:border-gray-600"></div>
				<div
					onClick={handleToggleNav}
					className="flex flex-col text-lg py-[.6rem] text-slate-400 font-semibold hover:bg-slate-800
					 px-3 my-1 mx-3 rounded-md tracking-wider cursor-pointer"
				>
					<div className="flex items-center justify-between gap-x-3">
						<span className="flex items-center gap-x-3">
							<MdAccountBox className="size-5" />
							Account
						</span>
						{toggleMenu ? <IoChevronUp /> : <IoChevronDown />}
					</div>
				</div>
				{toggleMenu && (
					<div className="tracking-wider text-slate-400 font-semibold">
						<Link
							to="/settings"
							className="flex items-center gap-x-3 text-lg py-[.6rem] hover:bg-slate-800 px-3 my-1 mx-3 mr-5 ml-5 rounded-md"
						>
							<IoSettingsSharp className="size-5" />
							Settings
						</Link>

						<button
							onClick={logOut}
							className="w-[85%] flex items-center gap-x-3 text-lg py-[.6rem] hover:bg-slate-800 px-3 my-1 mx-3 mr-5 ml-5 rounded-md"
						>
							<RiLogoutBoxLine className="size-5" />
							Log out
						</button>
					</div>
				)}
			</aside>
		</header>
	);
}
