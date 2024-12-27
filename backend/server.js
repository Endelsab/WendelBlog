import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import dbConnect from "./config/dbConnect.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
	dbConnect();
	console.log(`Server running on port ${PORT}`);
});
