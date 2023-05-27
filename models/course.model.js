const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    video_url: {
        type: String,
        required: false
    },
    create_at: { type: Date, default: Date.now }
});

const Course = mongoose.model("Coursevideo", courseSchema);
module.exports = Course;
