import Addpost from "../components/Addpost";
import Feeds from "../components/Feeds";

const Homepage = () => {
	return (
		<div className="flex justify-between px-4 md:px-8 lg:px-16 mt-6">
			<div className="hidden md:block">left</div>

			<div>
				<Addpost />
				<Feeds />
			</div>

			<div className="hidden md:block">right</div>
		</div>
	);
};

export default Homepage;
