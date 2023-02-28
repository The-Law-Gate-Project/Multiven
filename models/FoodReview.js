import mongoose from "mongoose";

const FoodReviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  foodId: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 200,
  },
  rating: {
    type: Number,
  },
});

export default mongoose.models.FoodReview ||
  mongoose.model("FoodReview", FoodReviewSchema);
