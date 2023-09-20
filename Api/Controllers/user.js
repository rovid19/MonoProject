import vehicleMake from "../Models/VehicleMake.js";
import vehicleModel from "../Models/VehicleModel.js";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

const bucket = "gymtok-photo-video-upload";

async function uploadToS3(path, orignalFilename, mimetype) {
  const client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });
  const parts = orignalFilename.split(".");
  const ext = parts[parts.length - 1];
  const newFilename = Date.now() + "." + ext;

  const data = await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Body: fs.readFileSync(path),
      Key: newFilename,
      ContentType: mimetype,
      ACL: "public-read",
    })
  );
  return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

export const addVehicle = async (req, res) => {
  const { plainJsVehicleObject } = req.body;

  try {
    const newVehicleMake = await vehicleMake.create({
      name: plainJsVehicleObject.vehicleName,
    });
    const newVehicleModel = await vehicleModel.create({
      name: plainJsVehicleObject.vehicleModel,
      yearMade: plainJsVehicleObject.vehicleYear,
      price: plainJsVehicleObject.vehiclePrice,
      makeId: newVehicleMake._id,
      picture: plainJsVehicleObject.vehiclePicture,
    });

    res.json(newVehicleModel);
  } catch (e) {
    console.log(e);
  }
};

export const getVehicles = async (req, res) => {
  const { page, sortBy, startingPrice, finalPrice } = req.query;

  // find all vehicles in the database
  const allVehicles = await vehicleModel.find().populate("makeId", "name");

  // calculate what is a max possible page number on homepage
  const pageOutput = Math.ceil(allVehicles.length / 10);

  // display only items on a certain page
  let newVehicleArray = [];
  const endingIndex = 10 * page - 1;
  const startingIndex = endingIndex - 9;
  allVehicles.forEach((vehicle, i) => {
    if (i >= startingIndex && i <= endingIndex) {
      newVehicleArray.push(vehicle);
    }
  });

  //if user set sorting in extra options
  switch (sortBy) {
    case "Highest to lowest price":
    case "htl_price":
      newVehicleArray.sort((a, b) => b.price - a.price);
      break;
    case "Lowest to highest price":
    case "lth_price":
      newVehicleArray.sort((a, b) => a.price - b.price);
      break;
    case "None":
      break;
  }

  //if user set filter by price in extra options
  if (startingPrice) {
    let filterByPriceArray = [];
    newVehicleArray.forEach((vehicle) => {
      if (vehicle.price >= startingPrice && vehicle.price <= finalPrice) {
        filterByPriceArray.push(vehicle);
      }
    });
    newVehicleArray = [...filterByPriceArray];
  }

  res.json({
    allVehicles: newVehicleArray,
    maxPage: pageOutput,
  });
};

export const deleteVehicle = async (req, res) => {
  const { vehicleId } = req.body;

  await vehicleModel.findByIdAndDelete(vehicleId);

  res.json("ok");
};

export const getVehicleById = async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const findVehicle = await vehicleModel
      .findById(vehicleId)
      .populate("makeId", "name");

    res.json(findVehicle);
  } catch (e) {
    console.log(e);
  }
};

export const editVehicle = async (req, res) => {
  const { vehicleId, name, model, year, price, picture } = req.body;

  const vehicleM = await vehicleModel.findById(vehicleId.vehicleId);

  const vehicleMa = await vehicleMake.findById(vehicleM.makeId._id);

  vehicleM.set({
    name: model,
    yearMade: year,
    price: price,
    picture: picture,
  });

  vehicleMa.set({
    name: name,
  });

  await vehicleM.save();
  await vehicleMa.save();
  res.json(vehicleM);
};

export const uploadImage = async (req, res) => {
  const { path, originalname, mimetype } = req.files[0];

  try {
    const url = await uploadToS3(path, originalname, mimetype);
    res.json(url);
  } catch (e) {
    console.log(e);
  }
};
