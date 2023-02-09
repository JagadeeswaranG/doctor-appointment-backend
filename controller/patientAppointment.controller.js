const { connectDB, closeConnection } = require("../db/connection");
const mongodb = require("mongodb");
const { confirmationMail } = require("../lib/sendEmail");

/*Apply patient Appointment*/

let applyAppointment = async (req, res) => {
  try {
    if (req.userId === req.params.uId) {
      const db = await connectDB();
      req.body.createdAt = new Date().toString();
      req.body.role = "PATIENT";
      const patientApply = await db
        .collection("patients")
        .insertOne({ uId: new mongodb.ObjectId(req.params.uId), ...req.body });
      await closeConnection();
      res.json({
        message: `${patientApply.insertedId}`,
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
};

/*Appointment Confirmation to Mail*/

let confirmSendmail = async (req, res) => {
  try {
    if (req.userId === req.params.uId) {
      const db = await connectDB();
      const patientDetails = await db
        .collection("patients")
        .aggregate([
          {
            $match: {
              _id: new mongodb.ObjectId(req.params.pId),
            },
          },
          {
            $lookup: {
              from: "doctors",
              localField: "dept",
              foreignField: "dept",
              as: "result",
            },
          },
          {
            $unwind: "$result",
          },
          {
            $project: {
              pName: "$pname",
              pId: "$_id",
              email: "$email",
              dept: "$dept",
              visitingAs: "$visitingAs",
              consultant: "$result.name",
              qualification: "$result.qualification",
              preferredDate: "$preferredDate",
            },
          },
        ])
        .toArray();

      await confirmationMail(patientDetails);

      res.json(patientDetails);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
};

module.exports = { applyAppointment, confirmSendmail };
