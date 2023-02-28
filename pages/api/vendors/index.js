import Vendor from "../../../models/Vendor.js";
import dbConnect from "../../../util/mongo.js";

export default async function handler(req, res) {
  // connecting mongodb to the application by calling the dbconnect function
  await dbConnect();

  // GET ALL THE VENDORS
  if (req.method === "GET") {
    try {
      const vendorList = await Vendor.find();
      res.status(200).json(vendorList);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // CREATE NEW VENDOR ---> VENDOR AND ADMIN ROUTE ONLY
  if (req.method === "POST") {
    try {
      const newVendor = await Vendor.create(req.body);
      res.status(200).json(newVendor);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
