import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	try {
		// Generate the token
		const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
			expiresIn: "7d",
		});

		// Set the cookie with the token
		res.cookie("jwt", token, {
			maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
			httpOnly: true, // Prevents access to cookie via client-side JavaScript
			sameSite: "strict", // Mitigates CSRF attacks
			secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
		});
	} catch (error) {
		console.error("Error generating token or setting cookie:", error.message);
		throw new Error("Token generation failed");
	}
};

export default generateTokenAndSetCookie;
