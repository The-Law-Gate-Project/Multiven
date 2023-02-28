import mongoose from "mongoose";

const FoodItemsSchema = new mongoose.Schema(
  {
    vendorId: {
      type: String,
      required: true,
    },
    foodName: {
      type: String,
      required: true,
      maxlength: 60,
    },
    foodDesc: {
      type: String,
      required: true,
      maxlength: 200,
    },
    foodPic: {
      type: String,
      required: true,
    },
    // foodPrices: {
    //   type: [Number], // will contain two values the first value is the price of half plate, and the second value is the price of full plate
    //   required: true,
    // },
    options: [
      {
        text: {
          type: String,
          required: true,
        },
        price: { type: Number, required: true },
      },
    ],
    isAvailable: {
      type: Boolean, // is available for ordering or not
      required: false,
    },
    category: {
      // veg or non-veg
      type: Number, // 0 for veg and 1 for non-veg
      required: true,
    },
    extraOptions: [
      // it is the type of array
      {
        text: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.FoodItem ||
  mongoose.model("FoodItem", FoodItemsSchema);
