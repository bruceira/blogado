const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({

	firstName: {
		type: String,
		required: [true, "must have firstname"]
	},

	lastName: {
		type: String,
		required: [true, "must have lastname"]
	},

	email: {
		type: String,
		required: [true, "must have email"],
		validate: [validator.isEmail, "plz provide correct email"],
		unique: true
	},

	password: {
		type: String,
		required: true,
		minlength: 8,
		select: false
	},

	role: {
		type: String,
		enum: ["admin", "user"],
		default: "user"
	}

})

userSchema.pre("save", async function (next) {
	if (!this.isModified('password')) return next()
	this.password = await bcrypt.hash(this.password, 12)
	next()
})

userSchema.methods.correctPassword = async function (currentPassword, password) {
	return await bcrypt.compare(currentPassword, password)
}


module.exports = mongoose.model("User", userSchema)