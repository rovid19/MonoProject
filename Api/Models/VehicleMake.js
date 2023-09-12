import mongoose from "mongoose";

const vehicleMakeSchema = new mongoose.Schema({
  name: String,
});

const vehicleMakeModel = mongoose.model("vehicleMake", vehicleMakeSchema);

export default vehicleMakeModel;
