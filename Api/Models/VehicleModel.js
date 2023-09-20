import mongoose from "mongoose";

const vehicleModelSchema = new mongoose.Schema({
  name: String,
  yearMade: Number,
  price: Number,
  picture: String,
  makeId: { type: mongoose.Schema.Types.ObjectId, ref: "vehicleMake" },
});

const vehicleModelModel = mongoose.model("vehicleModel", vehicleModelSchema);

export default vehicleModelModel;
