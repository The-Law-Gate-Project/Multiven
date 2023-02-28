// firebase otp login is used in this multiven app, after the user fills in the user details form all the data will be passed to this api endpoint and the phone number will be used to authenticate the user
import dbConnect from "../../util/mongo.js";
import User from "../../models/User";

// client will send the user details and then the access tokens and the refresh tokesn will be used here in the backend

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "POST") {
    const { fname, email, phone, address, landmark } = req.body;

    try {
      const newUser = await User.create({
        fname,
        email,
        phone,
        address,
        landmark,
      });
      res.status(200).json(newUser);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
  if (req.method === "GET") {
    req
      .status(200)
      .json("Please use post request to register the user into the database");
  }
}
