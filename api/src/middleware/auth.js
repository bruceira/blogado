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

const protectTokenByAdmin = (...roles) => {

  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next()
    } else {
      res.status(403).json("u are not alowed to do that!!")

    }
    next()
  }
  // protect(req, res, () => {
  //   if (req.user.id === req.params.id || req.user.isAdmin) {
  //     next()
  //   } else {
  //     res.status(403).json("u are not alowed to do that!!")
  //   }
  // })
}

module.exports = { protect, protectTokenByAdmin }
