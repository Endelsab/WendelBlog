// import cloudinary from "../config/cloudinary.js";
import generateTokenAndSetCookie from "../config/cookiesAndToken.js";
import UserModel from "../models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
	try {
		const { firstname, lastname, email, password } = req.body;

		// Validate input
		if (!firstname || !lastname || !email || !password) {
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

		// Create user
		const newUser = await UserModel.create({
			firstname,
			lastname,
			email,
			password,
		});

		// If user creation fails (unlikely due to the `try` block)
		if (!newUser) {
			return res.status(400).json({
				success: false,
				message: "Failed to create user",
			});
		}

		// Generate token and set cookie
		generateTokenAndSetCookie(newUser._id, res);

		// Respond with success and user data
		return res.status(201).json({
			success: true,
			user: newUser,
		});
	} catch (error) {
		console.error("Error in signUp controller:", error.message);

		// Respond with a generic error message
		return res.status(500).json({
			success: false,
			message: "An error occurred while processing your request",
			error: error.message, // Optionally remove in production
		});
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
	try {
		// Clear the cookie with proper configurations
		res.clearCookie("jwt", {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
		});
		return res
			.status(200)
			.json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.error("Error during logout:", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal server error during logout",
		});
	}
};
export const getUser = async (req, res) => {
	try {
		const user = await UserModel.findById(req.user._id).select("-password");

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			success: true,
			user,
		});
	} catch (error) {
		console.error("Error in getUser controller:", error.message);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};
