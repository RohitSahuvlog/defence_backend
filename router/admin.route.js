const multer = require('multer');
const router = require("express");
const Course = require("../models/course.model");
const studyMaterial = require("../models/studymaterial.model");
const User = require("../models/user.models");
const storage = require('../middlewares/fileconfig');

const adminroute = router();
const upload = multer({
    storage: storage,
    // fileFilter: function (req, file, cb) {
    //     // Check the file type or MIME type
    //     if (file.mimetype === 'application/pdf') {
    //         // Accept the file
    //         cb(null, true);
    //     } else {
    //         // Reject the file
    //         cb(new Error('Only PDF files are allowed'));
    //     }
    // }
});
adminroute.post("/uploadcourse", upload.single('file'), async (req, res) => {
    try {
        const { title, thumbnail, description, video_url } = req.body;

        if (!title || !thumbnail || !description || !video_url) {
            return res.status(401).json({ message: "fill the all fields" });
        }

        const course = new Course({
            title,
            thumbnail,
            description,
            video_url,
        });
        await course.save();

        res.status(201).json({ message: "Course Successfully upload" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
adminroute.patch("/updatecourse", async (req, res) => {
    try {
        const { title, thumbnail, description } = req.body;

        if (!title || !thumbnail || !description) {
            return res.status(401).json({ message: "fill the all fields" });
        }
        var data = await Course.findOneAndUpdate({ _id: req.query.id }, req.body);
        console.log(data)
        res.status(200).json({ message: "Course updated" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

adminroute.delete("/deletecourse", async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.query.id });

        res.status(200).json({ message: "Course successfully delete" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

adminroute.post("/uploadmaterial", upload.single('file'), async (req, res) => {
    try {
        const { title, description } = req.body;
        const file = req.file;
        console.log(file.filename)
        if (!title || !description) {
            return res.status(401).json({ message: "fill the all fields" });
        }
        const material = new studyMaterial({
            title,
            description,
            pdf_link: file.filename,
        });
        await material.save();
        return res.status(201).json({
            message: "Material Successfully upload",
        });
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

adminroute.patch("/updatematerial", async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(401).json({ message: "fill the all fields" });
        }

        await studyMaterial.updateOne({ _id: req.query.id }, req.body);

        res.status(201).json({ message: "Studymaterial updated" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

adminroute.delete("/deletematerial", async (req, res) => {
    try {
        await studyMaterial.deleteOne({ _id: req.query.id });

        res.status(200).json({ message: "Studymaterial successfully delete" });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

adminroute.get("/getuserlist", async (req, res) => {
    try {
        const userList = await User.find();

        res.status(200).json({ userList });
    } catch (error) {
        console.error("Error in getcourse:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = {
    adminroute,
};
