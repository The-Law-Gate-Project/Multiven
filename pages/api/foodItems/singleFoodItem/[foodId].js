import FoodItem from "../../../../models/FoodItem";
import dbConnect from "../../../../util/mongo";

export default async function handler(req, res) {
  await dbConnect();
  const { foodId } = req.query;

  // GET A SINGLE FOOD ITEM
  if (req.method === "GET") {
    try {
      const foodItem = await FoodItem.findById(foodId);
      res.status(200).json(foodItem);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // UPDATE A FOOD ITEM ---> VENDOR ONLY ROUTE
  if (req.method === "PUT") {
    try {
      const updatedFoodItem = await FoodItem.findByIdAndUpdate(
        foodId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedFoodItem);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // DELETE A FOOD ITEM ---> VENDOR ONLY ROUTE

  if (req.method === "DELETE") {
    try {
      const deletedFoodItem = await FoodItem.deleteOne({ _id: foodId });
      res
        .status(200)
        .json({ msg: "food item deleted successfully", deletedFoodItem });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
