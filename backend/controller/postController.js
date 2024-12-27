import PostModel from "../models/postModel.js";

export const createPost = async (req, res) => {
	try {
		const { description, postImage } = req.body;

		if (!description || !postImage) {
			return res.status(400).json({
				success: false,
				message: "Post must not have empty fields",
			});
		}

		const newPost = await PostModel.create({
			description,
			postImage,
			postUser: req.user._id,
		});

		res.status(201).json({
			success: true,
			message: "Post created successfully",
			post: newPost,
		});
	} catch (error) {
		console.error("Error in creating a post:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const getPosts = async (req, res) => {
	try {
		const posts = await PostModel.find().lean(); // Use .lean() for better performance

		if (posts.length === 0) {
			return res.status(404).json({
				success: false,
				message: "No posts found",
			});
		}

		res.status(200).json({
			success: true,
			posts,
		});
	} catch (error) {
		console.error("Error in getting posts:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

export const deletePost = async (req, res) => {
	try {
		const postId = req.params.id;

		const post = await PostModel.findOneAndDelete({
			_id: postId,
			postUser: req.user._id,
		});

		if (!post) {
			return res.status(404).json({
				success: false,
				message: "Post not found or unauthorized to delete",
			});
		}

		res.status(200).json({
			success: true,
			message: "Post deleted successfully",
		});
	} catch (error) {
		console.error("Error in deleting a post:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
