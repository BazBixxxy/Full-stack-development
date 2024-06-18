import Post from "../models/post.model.js";

export const addPost = async (req, res) => {
  try {
    const { post, description, category } = req.body;
    const ownerId = req.user._id;
    const owner = req.user.username;
    const ownerPic = req.user.profilePic;

    const newPost = new Post({
      ownerId,
      ownerPic,
      owner,
      post,
      description,
      category,
    });

    await newPost.save();

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

export const getPosts = async (req, res) => {
  try {
    const order = req.query.order || "desc";
    const sort = req.query.sort || "createdAt";
    const posts = await Post.find({}).sort({ [sort]: order });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      res.status(201).json("post not found");
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.find({});
    const userPosts = posts.filter((post) => {
      return post.ownerId == id;
    });
    if (userPosts) {
      res.status(200).json(userPosts);
      // console.log(userPosts);
    } else {
      res.status(200).json("no posts found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

export const deleteUserPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json("post not found");
    res.status(200).json("post has been deleted");
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};
