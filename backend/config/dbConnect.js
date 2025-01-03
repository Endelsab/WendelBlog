import mongoose from "mongoose";

const dbConnect = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB Connected: ${connect.connection.host}`);
	} catch (error) {
		console.log("Error in dbconfig ", error.message);
	}
};

export default dbConnect;
