import mongoose from "mongoose";

const vehicleModelSchema = new mongoose.Schema({
  Name: String,
  YearMade: Number,
  Price: Number,
  MakeId: { type: mongoose.Schema.Types.ObjectId, ref: "vehicleMake" },
});

const vehicleModelModel = mongoose.model("vehicleModel", vehicleModelSchema);

export default vehicleModelModel;
