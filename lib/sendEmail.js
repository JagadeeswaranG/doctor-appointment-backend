const nodemailer = require("nodemailer");

/* Password Reset Email link*/
let passwordResetEmail = async (email, title, content, link) => {
  try {
    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jagadees.vg@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    var mailOptions = {
      from: "jagadees.vg@gmail.com",
      to: email,
      subject: title,
      html: `<p>${content}</p><p>Please click the below link to Reset your password, This link will be expired after 5 mins.</p><p>${JSON.stringify(
        link
      )}</p><p>Note: Don't share this link to anyone</p>`,
      // text: JSON.stringify(link)
    };

    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return false;
      } else {
        return true;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/* Email Appointment Confirmation*/
let confirmationMail = async (content) => {
  try {
    var transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "jagadees.vg@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: "jagadees.vg@gmail.com",
      to: content[0].email,
      subject: "Appointment Confirmed",
      html: `<p>Dear Mr/Mrs.${content[0].pName},</p><p> Your appointment is confirmed, Please find below the appointment details: </p>
  <p>Patient Id: ${content[0]._id}</p>
  <p>Patient Name: Mr/Mrs.${content[0].pName}</p>
  <p>Department: ${content[0].dept}</p>
  <p>Visiting As: ${content[0].visitingAs}</p>
  <p>Consultant:Dr.${content[0].consultant},${content[0].qualification}</p>
  <p>Appointment Date: ${content[0].preferredDate}</p>
  <p>Time: 9:00AM to 10:30AM</p>
  <p>Note: Please submit/show this details in the reception cum registration Desk to confirm your appointment</p>
  <p>Thanks for choosing our Medical Services, Get Well Soon.</p>`,
    };
    await transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Email sent");
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { passwordResetEmail, confirmationMail };
