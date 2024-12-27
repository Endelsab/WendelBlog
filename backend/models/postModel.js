import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			default: "",
			required: true,
		},
		postImage: {
			type: String,
			default: "",
		},
		postUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

const PostModel = mongoose.model("Post", userSchema);

export default PostModel;
