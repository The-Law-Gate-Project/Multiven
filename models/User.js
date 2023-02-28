import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    maxlength: [30, "First name should not exceed more than 30 characters."],
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    maxlength: [300, "Address should not exceed more than 300 characters."],
  },
  landmark: {
    type: String,
    required: true,
    maxlength: [200, "Landmark should not exceed more than 200 characters."],
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
