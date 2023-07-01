
const mongoose = require("mongoose")

require("dotenv").config()
const connection = mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

module.exports = { connection }