import avatar from "../assets/0a2a93d6-2841-4c61-afd3-e4cb49923a04.jfif";
import { Ellipsis } from "lucide-react";

const Posts = () => {
	return (
		<div className="flex flex-col shadow-md rounded-lg max-w-full bg-white p-2">
			<div className="flex items-center gap-4 flex-wrap">
				<img
					src={avatar}
					alt="avatart"
					className="size-12 rounded-full object-cover"
				/>
				<span className="font-medium font-sans">Wendel Sabayo</span>

				<Ellipsis className="ml-auto" />
			</div>
			<span className="text-sm mt-2 text-gray-500">time ago</span>

			<div className="flex flex-col gap-4 md:w-[580px]">
				<div className="w-full min-h-96 ">
					<img
						src={avatar}
						fill
						className="object-cover rounded-md size-80 mt-2"
						alt=""
					/>
					<p className=" mt-2 text-gray-800">
						{" "}
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
						dignissimos nostrum in ratione minus provident molestias praesentium
						placeat expedita dolore, molestiae excepturi accusantium eos!
						Perferendis quis quaerat consectetur quas. Mollitia. Ratione,
						voluptas! Laborum omnis quaerat recusandae? Id commodi perferendis
						veritatis totam inventore ipsam quasi voluptas accusantium quisquam
						odit, doloremque, voluptates dolores sed natus omnis doloribus a
						exercitationem repudiandae blanditiis eligendi?
					</p>
				</div>
			</div>
		</div>
	);
};

export default Posts;
