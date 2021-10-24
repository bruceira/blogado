const jwt = require("jsonwebtoken")
require("dotenv").config()


exports.protect = (req, res, next) => {
	try {

		let token


		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1]
		}

		if (!token) {
			return res.status(401).json("No token provided")
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET)

		req.user = decoded

	} catch (error) {

		console.log(error)
		res.status(404).json("invalid signature")

	}

	return next()
}

exports.restrictTo = (roles) => {



	return (req, res, next) => {



		if (!roles.includes(req.user.role)) {
			return res.status(403).send("Forbidden, Request")
		}



		next()
	}

}

