import cloudinary from "../config/cloudinary.js";
import generateTokenAndSetCookie from "../config/cookiesAndToken.js";
import UserModel from "../models/userModel.js";

export const signUp = async (req, res) => {
	try {
		const { firstName, lastName, email, password, image } = req.body;

		if (!firstName || !lastName || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}
		if (password.length < 6) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 6 characters",
			});
		}

		let imageUrl = null;

		if (image) {
			const uploadResponse = await cloudinary.uploader.upload(image, {
				folder: "users",
				resource_type: "image",
			});
			imageUrl = uploadResponse.secure_url;
		}

		const newUser = await UserModel.create({
			firstName,
			lastName,
			email,
			password,
			image: imageUrl,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				success: true,
				user: newUser,
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("error in signup controller ", error.message);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "All fields are required",
			});
		}

		const user = await UserModel.findOne({ email }).select("+password");

		if (!user || !(await user.matchPassword(password))) {
			return res.status(401).json({
				success: false,
				message: "Invalid email or password",
			});
		}

		generateTokenAndSetCookie(user._id, res);
		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		console.log("error in login controller ", error.message);
		res
			.status(500)
			.json({ message: "Internal server error", error: error.message });
	}
};

export const logout = async (req, res) => {
	res.clearCookie("jwt");
	res.status(200).json({ success: true, message: "Logged out successfully" });
};
