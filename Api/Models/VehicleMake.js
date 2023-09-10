import mongoose from "mongoose";

const vehicleMakeSchema = new mongoose.Schema({
  Name: String,
});

const vehicleMakeModel = mongoose.model("vehicleMake", vehicleMakeSchema);

export default vehicleMakeModel;
