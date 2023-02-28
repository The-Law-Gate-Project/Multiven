import dbConnect from "../../../util/mongo";
import FoodItem from "../../../models/FoodItem";

export default async function handler(req, res) {
  await dbConnect();
  const { vendorId } = req.query;
  // GET ALL FOOD ITEMS FROM ONE VENDOR
  if (req.method === "GET") {
    try {
      const foodItems = await FoodItem.find({ vendorId: vendorId });
      res.status(200).json(foodItems);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // ADD OR CREATE A FOOD ITEM ---> VENDOR ONLY ROUTE
  if (req.method === "POST") {
    try {
      const newFoodItem = await FoodItem.create(req.body);
      res.status(200).json(newFoodItem);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
