import React from "react";
import Posts from "./Posts";

const Feeds = () => {
	return (
		<div className="p-4  rounded-lg md:w-[720px]  flex flex-col gap-2 ">
			<Posts />
			<Posts />
			<Posts />
			<Posts />
			<Posts />
			<Posts />
			<Posts />
			<Posts />
			<Posts />
			<Posts />
		</div>
	);
};

export default Feeds;
