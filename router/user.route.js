const router = require("express");
const bcrypt = require("bcryptjs");
const studyMaterial = require("../models/studymaterial.model");
const query = require("../models/query.model");
const userrouter = router();
const nodemailer = require('nodemailer');
const Course = require("../models/course.model");

// phucvdwcqhczzhcj
userrouter.get("/getcourse", async (req, res) => {
    try {
        const coursedetails = await Course.find().sort({ create_at: -1 });

        res.status(200).json({ coursedetails });
    } catch (error) {
        console.error("Error in getcourse:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

userrouter.get("/getMaterial", async (req, res) => {
    try {
        const studymaterials = await studyMaterial.find().sort({ create_at: -1 });;

        res.status(200).json({ studymaterials });
    } catch (error) {
        console.error("Error in getMaterial:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
userrouter.post("/feedback", async (req, res) => {
    try {
        const { name, email, querydetails } = req.body;
        const querysave = new query({
            name,
            email,
            querydetails,
        });
        await querysave.save();
        // Create a transporter object with SMTP configuration
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: 'christop.barton@ethereal.email',
                pass: '3tXuDphd2bn8ZN2d4B'
            }
        });

        // Email configuration
        const mailOptions = {
            from: 'sahu86744@gmail.com',
            to: 'rs1797298@gmail.com',
            subject: "Feedback Form Submission",
            html: `
      <h1>Feedback Details</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Query:</strong> ${querydetails}</p>
    `
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
        res.status(200).json({
            message: "Email sent successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" });
    }
});



module.exports = {
    userrouter,
};
