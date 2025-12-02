import Adoption from "../models/Adoption.js";

// GET all adoptions
export const getAdoptions = async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate("petId userId");
    res.json(adoptions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE adoption
export const createAdoption = async (req, res) => {
  try {
    const adoption = new Adoption(req.body);
    await adoption.save();
    res.status(201).json(adoption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE adoption status
export const updateAdoption = async (req, res) => {
  try {
    const adoption = await Adoption.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!adoption) return res.status(404).json({ message: "Adoption not found" });
    res.json(adoption);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
