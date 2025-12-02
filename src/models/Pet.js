  import mongoose from "mongoose";

  const petSchema = new mongoose.Schema({
    name: { type: String, required: true },
    species: { type: String, required: true },
    age: Number,
    breed: String,
    status: { type: String, default: "Available" },
  }, { timestamps: true });

  export default mongoose.model("Pet", petSchema);
