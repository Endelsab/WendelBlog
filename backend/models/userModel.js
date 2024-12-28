import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		firstname: {
			type: String,
			required: true,
		},
		lastname: {
			// Fixed the typo here
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true, // Ensure email is unique
			match: [/\S+@\S+\.\S+/, "Please provide a valid email address"], // Email validation
		},
		password: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true },
);

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		// If the password hasn't been modified, skip hashing
		return next();
	}
	this.password = await bcrypt.hash(this.password, 8);
	next();
});

// Method to compare entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
const UserModel = mongoose.model("User", userSchema);
export default UserModel;
