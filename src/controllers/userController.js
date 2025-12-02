import User from "../models/User.js";
import Adoption from "../models/Adoption.js";

// GET all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE user
export const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET user’s adoptions
export const getUserAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find({ userId: req.params.id }).populate("petId");
    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
