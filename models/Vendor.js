import mongoose from "mongoose";
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const VendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    fssaiNum: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Vendor || mongoose.model("Vendor", VendorSchema);
