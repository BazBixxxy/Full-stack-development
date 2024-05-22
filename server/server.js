import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";
import { app, server } from "./sockets/socket.js";
import path from "path";
config();

// imports
import authRoutes from "./routes/auth.routes.js";
import uploadImage from "./utilities/uploadImages.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

const __dirname = path.resolve();

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

// * with this I can run my client side on the server
app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

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
