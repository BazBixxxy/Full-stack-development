import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { app, server } from "./sockets/socket.js";
config();

// imports
import authRoutes from "./routes/auth.routes.js";
import uploadImage from "./utilities/uploadImages.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

// middleware
app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cors());
app.use(cookieParser());

// middleware routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/api/test", (req, res) => {
  res.status(200).json("server running here");
});

// image uploading api
app.post("/api/uploadImages", async (req, res) => {
  try {
    const url = await uploadImage(req.body.image);
    // console.log(url);
    res.status(200).json(url);
  } catch (error) {
    console.log(error.message);
  }
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    server.listen(5000, () => {
      console.log("server running on port 5000");
    });
  })
  .catch((error) => {
    console.log(`Internal server error ${error}`);
  });
