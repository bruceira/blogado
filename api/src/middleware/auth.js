const jwt = require("jsonwebtoken")
require("dotenv").config()


const protect = (req, res, next) => {
  try {

    let token


    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      return res.status(401).json("a token is required")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decoded


  } catch (error) {

    console.log(error)

  }

  return next()
}

module.exports = protect