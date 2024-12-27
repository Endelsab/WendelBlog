import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.jwt;

		if (!accessToken) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - No access token provided",
			});
		}

		const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
		if (!decoded) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - Invalid token",
			});
		}

		const user = await UserModel.findById(decoded.userId).select("-password");
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - User not found",
			});
		}

		req.user = user;

		next();
	} catch (error) {
		if (error.name === "TokenExpiredError") {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - Token expired",
			});
		}

		console.error("Error in protectRoute middleware:", error.message);
		return res.status(401).json({
			success: false,
			message: "Unauthorized - Token verification failed diri ka authenticated",
		});
	}
};
