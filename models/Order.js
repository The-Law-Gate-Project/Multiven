import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60, // this is the check contraint
    },
    address: {
      type: String,
      required: true,
      maxlength: 200,
    },
    phone: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number, // in this case the type is array but the array will only contain numric- integer values
      default: 0, // this means that whenever we create a new order the initial state is zero or the payment has been done
    },
    method: {
      type: Number, // when user pays with cash it will be 0 and if the user pays with UPI then this method will have value 1
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || // this means if there is already a model in our db then do not create the model again and again
  mongoose.model("Order", OrderSchema);
