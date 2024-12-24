import { useRef, useState } from "react";
import logo from "../assets/0a2a93d6-2841-4c61-afd3-e4cb49923a04.jfif";

import { ImageUp, Video } from "lucide-react";

const Addpost = () => {
	const [image, setImage] = useState(false);

	const fileInputRef = useRef(null);

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImage(reader.result);
			};

			reader.readAsDataURL(file);
		}
	};

	const [isPost, setIsPost] = useState(false);

	return (
		<div className="p-4 mt-2  md:w-[45rem] bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
			{/* AVATAR */}
			<img
				src={logo}
				alt="logo"
				width={48}
				height={48}
				className="w-12 h-12 object-cover rounded-full"
			/>

			{/* POST */}
			<div className="flex-1 ">
				{/* TEXT INPUT */}
				<form className="flex gap-4">
					<textarea
						onFocus={() => setIsPost(true)}
						placeholder="What's on your mind?"
						className="flex-1 bg-slate-100 rounded-lg p-2 border focus:border-blue-300 focus:outline-none"
						name="description"></textarea>
				</form>
				<div>
					{image && (
						<div className="mt-4">
							<img
								src={image}
								alt="User Image"
								className="w-48 h-48 object-cover rounded-md"
							/>
						</div>
					)}
				</div>
				<div className="mt-4 flex items-center ml-6">
					<button
						type="button"
						onClick={() => fileInputRef.current.click()}
						className=" text-sky-800 bg-white font-bold hover:text-sky-500 transition-all ease-in-out ">
						<ImageUp />
						photo
					</button>
					<button className="ml-6  text-sky-800 bg-white font-bold hover:text-sky-500 transition-all ease-in-out">
						<Video />
						video
					</button>

					<input
						ref={fileInputRef}
						type="file"
						accept="image/*"
						className="hidden"
						onChange={handleImageChange}
					/>
				</div>
				{isPost && (
					<button className="py-2 text-sm md:text-lg font-semibold mt-8 px-4 w-full rounded-3xl transition-all ease-in-out hover:bg-sky-500 bg-sky-600 text-white">
						Post👋
					</button>
				)}
			</div>
		</div>
	);
};

export default Addpost;
