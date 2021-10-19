const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')
const User = require("../model/userModel")
require("dotenv").config()


exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body

    if (!(email && firstName && lastName && password, role)) {
      res.status(400).json({ message: "no required" })
    }

    const olduser = await User.findOne({ email }).select("+password")

    if (olduser) {
      res.status(406).send("not valid")
    }

    const encryptedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      role

    })


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
    console.log(token)

    user.token = token

    res.status(201).json(user)
  } catch (error) {
    console.log(error)
    res.status(404).json({ error })
  }


}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!(email && password)) {
      res.status(403).json({ status: "fail" })
    }

    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {


      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRESIN })
      console.log(token)

      user.token = token



    }
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }

}