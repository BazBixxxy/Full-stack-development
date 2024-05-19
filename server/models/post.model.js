import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    ownerPic: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    liked: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      default: "other",
    },
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
