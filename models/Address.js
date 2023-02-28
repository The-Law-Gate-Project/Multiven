import mongoose from "mongoose";

// this will also be used as the user data in the future for marketing and analytical purposes

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    maxlength: 10,
  },
  address: {
    type: String,
    required: true,
    maxlength: 300,
  },
  email: {
    type: String,
    required: false,
  },
});

export default mongoose.models.Address ||
  mongoose.model("Address", AddressSchema);
