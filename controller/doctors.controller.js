const mongodb = require("mongodb");
const { connectDB, closeConnection } = require("../db/connection");

/* Doctor Register. */
async function register(req, res) {
  try {
    const db = await connectDB();
    req.body.createdAt = new Date().toString();
    req.body.role = "DOCTOR";
    const doctorData = await db.collection("doctors").insertOne(req.body);
    res.json({ message: "Doctor Registered Successfully !" });
    await closeConnection();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error !" });
  }
}

/*All Doctor's Details. */
async function allDoctors(req, res) {
  try {
    const db = await connectDB();
    const doctorsDetails = await db.collection("doctors").find().toArray();

    if (!doctorsDetails || doctorsDetails.length == 0) {
      res.status(401).json({ message: "No Doctor Found !" });
    } else {
      res.json(doctorsDetails);
    }

    await closeConnection();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server error !" });
  }
}

/*Delete Doctor. */
async function deleteDoctor(req, res) {
  try {
    const db = await connectDB();
    const doctorData = await db
      .collection("doctors")
      .findOne({ _id: new mongodb.ObjectId(req.params.doctorId) });

    if (!doctorData) {
      res.status(401).json({ message: "Data not found !" });
    } else {
      const response = await db
        .collection("doctors")
        .deleteOne({ _id: doctorData._id });
      res.json({ message: "Doctor data deleted !" });
    }

    await closeConnection();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error !" });
  }
}

module.exports = { register, allDoctors, deleteDoctor };
