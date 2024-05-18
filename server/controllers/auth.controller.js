import User from "../models/user.model.js";
import bycrpt from "bcryptjs";
import generateTokenAndSetCookie from "../utilities/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { username, profilePic, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      return res.status(404).json("username already exists");
    }

    const salt = await bycrpt.genSalt(10);
    const hashPassword = await bycrpt.hash(password, salt);

    const newUser = await User.create({
      username,
      profilePic,
      password: hashPassword,
    });

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      photo: newUser.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    const isPasswordCorrect = await bycrpt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(404).json({ error: `invalid username or password` });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json("user logged out successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal server error");
  }
};
