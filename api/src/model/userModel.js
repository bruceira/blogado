const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: true
  },
  token: {
    type: String
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }

})


module.exports = mongoose.model("User", userSchema)