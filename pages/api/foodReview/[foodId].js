import dbConnect from "../../../util/mongo";
import FoodReview from "../../../models/FoodReview";

export default async function handler(req, res) {
  await dbConnect();
  const { foodId } = req.query;
  // GET REVIEWS ON A SINGLE FOOD ITEM
  if (req.method === "GET") {
    try {
      const foodReviews = await FoodReview.find({ foodId: foodId });
      res.status(200).json(foodReviews);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // ADD OR CREATE A FOOD ITEM ---> VENDOR ONLY ROUTE
  if (req.method === "POST") {
    try {
      const newFoodReview = await FoodReview.create(req.body);
      res.status(200).json(newFoodReview);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
