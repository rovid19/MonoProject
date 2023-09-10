import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  test: String,
});

const testModel = mongoose.model("test", testSchema);

export default testModel;
