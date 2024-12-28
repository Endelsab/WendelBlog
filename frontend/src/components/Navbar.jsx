import { useState, useEffect } from "react";
import logo from "../assets/0a2a93d6-2841-4c61-afd3-e4cb49923a04.jfif";
import { Link } from "react-router";

const Navbar = () => {
	const [open, setOpen] = useState(false);

	// Disable scroll when the menu is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		return () => (document.body.style.overflow = "auto");
	}, [open]);

	return (
		<div className="w-full h-16 md:h-20 flex items-center justify-between relative">
			<Link to="/home" className="flex items-center gap-4 text-2xl">
				<img
					src={logo}
					alt="logo"
					className="mt-4 object-cover size-16 rounded-full"
				/>

				<span className="text-sky-500 font-extrabold">WendelBlog</span>
			</Link>

			{/* MOBILE MENU */}
			<div className="md:hidden pe-2">
				{/* MOBILE BUTTON */}
				<div
					className="cursor-pointer text-4xl"
					onClick={() => setOpen((prev) => !prev)}>
					<div className="flex flex-col gap-[5.4px]">
						<div
							className={`h-[3px] rounded-md w-6 bg-sky-500 origin-left transition-all ease-in-out ${
								open && "rotate-45"
							}`}></div>
						<div
							className={`h-[3px] rounded-md w-6 bg-sky-500 transition-all ease-in-out ${
								open && "opacity-0"
							}`}></div>
						<div
							className={`h-[3px] rounded-md w-6 bg-sky-500 origin-left transition-all ease-in-out ${
								open && "-rotate-45"
							}`}></div>
					</div>
				</div>
				{/* MOBILE LINK LIST */}
				<div
					className={`w-full h-screen bg-[#e6e6ff] flex flex-col items-center justify-center gap-8 font-medium text-lg fixed top-0 left-0 z-50 transition-all ease-in-out ${
						open ? "translate-x-0" : "-translate-x-full"
					}`}>
					<Link
						className="hover:text-sky-500 transition-all ease-in-out"
						to="/"
						onClick={() => setOpen(false)}>
						Home
					</Link>
					<Link
						className="hover:text-sky-500 transition-all ease-in-out"
						to="/posts?sort=trending"
						onClick={() => setOpen(false)}>
						About
					</Link>
					<Link
						className="hover:text-sky-500 transition-all ease-in-out"
						to="/posts?sort=popular"
						onClick={() => setOpen(false)}>
						Profile
					</Link>

					<Link to="/login" onClick={() => setOpen(false)}>
						<button className="py-2 px-4 rounded-3xl bg-sky-500 text-white">
							Login 👋
						</button>
					</Link>
				</div>
			</div>

			{/* DESKTOP MENU */}
			<div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
				<Link to="/" className="hover:text-sky-500 transition-all ease-in-out">
					Home
				</Link>
				<Link
					to="/posts?sort=trending"
					className="hover:text-sky-500 transition-all ease-in-out">
					About
				</Link>
				<Link
					to="/posts?sort=popular"
					className="hover:text-sky-500 transition-all ease-in-out">
					Profile
				</Link>

				<Link to="/login">
					<button className="py-2 px-4 rounded-3xl bg-sky-500 text-white">
						Login 👋
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
