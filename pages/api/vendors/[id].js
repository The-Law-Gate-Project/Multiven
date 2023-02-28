import dbConnect from "../../../util/mongo";
import Vendor from "../../../models/Vendor";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  await dbConnect();

  // GET SINGLE VENDOR ---> VENDOR AND ADMIN ROUTE ONLY
  if (method === "GET") {
    try {
      const vendor = await Vendor.findById(id);
      res.status(200).json(vendor);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // UPDATE A VENDOR ---> VENDOR AND ADMIN ROUTE ONLY
  if (method === "PUT") {
    try {
      const updatedVendor = await Vendor.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedVendor);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // DELETE A VENDOR ---> VENDOR AND ADMIN ROUTE ONLY
  if (method === "DELETE") {
    try {
      await Vendor.deleteOne({ _id: id });
      res.status(200).json({ msg: "vendor deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
