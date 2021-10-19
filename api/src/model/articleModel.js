const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
  title: { type: String, required: [true, "must have the title"], unique: true },
  description: { type: String, required: true },
  roles: { type: String, default: "user" },
  date: { type: Date, default: Date.now },
})

module.exports = mongoose.model("Article", articleSchema)