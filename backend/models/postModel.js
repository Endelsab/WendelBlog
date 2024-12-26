import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			default: "",
		},
		postImage: {
			type: String,
			default: "",
		},
		postUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true },
);

const PostModel = mongoose.model("Post", userSchema);

export default PostModel;
