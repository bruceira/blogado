const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, defaut: new Date() },
  roles: { type: String, default: "user" }
})

module.exports = mongoose.model("Article", articleSchema)