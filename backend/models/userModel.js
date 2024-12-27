import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		laststName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			min: 6,
		},
		password: {
			type: String,
			required: true,
			unique: true,
		},
		image: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true },
);

userSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 8);
	next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
