import dbConnect from "../../../../util/mongo";
import FoodReview from "../../../../models/FoodReview";

export default async function handler(req, res) {
  await dbConnect();
  const { reviewId } = req.query;

  // GET A SINGLE FOOD ITEM
  if (req.method === "GET") {
    try {
      const foodReview = await FoodReview.findById(reviewId);
      res.status(200).json(foodReview);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // UPDATE A FOOD ITEM ---> VENDOR ONLY ROUTE
  if (req.method === "PUT") {
    try {
      const updatedReview = await FoodReview.findByIdAndUpdate(
        reviewId,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedReview);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // DELETE A FOOD ITEM ---> VENDOR ONLY ROUTE

  if (req.method === "DELETE") {
    try {
      const deletedFoodReview = await FoodReview.deleteOne({ _id: reviewId });
      res
        .status(200)
        .json({ msg: "food item deleted successfully", deletedFoodReview });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
