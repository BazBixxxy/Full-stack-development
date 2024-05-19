import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};

export const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) return res.status(404).json("user doesn't exist");
    const updatedUser = await User.findById(id);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json("internal server error");
  }
};
