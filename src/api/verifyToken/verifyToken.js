const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
	// taking the token in to a variable
	const authHeader = req.header("authToken");

	// checking whether the token is available
	if (authHeader) {
		// verifying the token
		jwt.verify(
			authHeader,
			process.env.TOKEN_SECRET,
			(err, verifiedUser) => {
				// if the token is not valid
				if (err) {
					res.status(403).json("Token is not valid !");
				} else {
					// if the token is valid taking it as a valid user
					req.user = verifiedUser;
					next();
				}
			},
		);
		// if authHeader is not available
	} else {
		// returning user is not authenticated
		return res.status(401).json("You are not Authenticated");
	}
};

module.exports = verifyToken;
