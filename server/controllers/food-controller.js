const foodModel = require("../models/food-model");
const { v4: uuid } = require("uuid");
const StatusCode = require("../utils/status-code");
const storageService = require("../services/storage-service");
// create a food with video
const createFood = async (req, res) => {
  try {
    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid(),
    );
    const foodItem = await foodModel.create({
      name: req.body.name,
      video: fileUploadResult.url,
      description: req.body.description,
      foodPartner: req.foodPartner._id,
    });
    return res
      .status(StatusCode.CREATED)
      .json({ message: "Food item is created", data: foodItem });
  } catch (error) {
    return res
      .status(StatusCode.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
};

// get food feed
const getFoodItems = async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}

module.exports = { createFood, getFoodItems };
