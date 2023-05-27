const router = require("express");
const bcrypt = require("bcryptjs");
const authroute = router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

// phucvdwcqhczzhcj
authroute.post("/signup", async (req, res) => {
    try {
        const {
            fullname,
            email,
            password,
            contactnumber,
            classstandard,
            stream,
            state,
            role,
        } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            fullname,
            email,
            password: hashedPassword,
            contactnumber,
            classstandard,
            stream,
            state,
            role,
        });
        await user.save()

        res.status(201).json({ message: "User   created" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

authroute.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by the email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Authentication failed" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id, email: email }, process.env.JWT_SECRET);

        return res.status(200).json({
            message: "Login Successfully",
            token,
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = {
    authroute,
};
