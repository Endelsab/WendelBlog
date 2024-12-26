import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			require: true,
		},
		laststName: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
			min: 6,
		},
		password: {
			type: String,
			require: true,
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
