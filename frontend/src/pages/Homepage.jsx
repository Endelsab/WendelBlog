import { useEffect } from "react";
import Addpost from "../components/Addpost";
import Feeds from "../components/Feeds";

import { useUserStore } from "../stores/useUserStore";

const Homepage = () => {
	const { user } = useUserStore();

	useEffect(() => {
		user;
		console.log(user);
	}, [user]);

	return (
		<div className="flex justify-between px-4 md:px-8 lg:px-16 mt-6">
			<div className="hidden md:block">left</div>

			<div>
				{user ? <Addpost /> : ""}

				<Feeds />
			</div>

			<div className="hidden md:block">right</div>
		
		</div>
	);
};

export default Homepage;
