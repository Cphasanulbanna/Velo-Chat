import User from "../models/user.model.js";

export const getUsersList = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json({ success: true, users: filteredUsers });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
