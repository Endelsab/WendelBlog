import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";

const MainLayout = () => {
	return (
		<div className="items-center px-4 md:px-8 lg:px-16 2xl:px-32">
			<Navbar />
			<Toaster />
			<Outlet />
		</div>
	);
};

export default MainLayout;
