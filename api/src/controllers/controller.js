const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const User = require("../model/userModel")
require("dotenv").config()


exports.signup = async (req, res, next) => {
	try {
		const newUser = await User.create(req.body)
		let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
		res.status(201).json({ status: "success", token, data: { user: newUser } })
	} catch (error) {
		console.log(error)
		res.status(404).json({ status: "Fail", error })
	}
	next()
}







exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(401).send("plz provide email and password")
		}

		const user = await User.findOne({ email }).select("+password")


		if (!user || !(await user.correctPassword(password, user.password))) {
			return res.status(406).send("email or password not correct")
		}



		const payload = {
			id: user._id,
			role: user.role
		}

		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })

		res.status(200).json({ status: "success", token })

	} catch (error) {

		console.log(error)

	}

	next()
}