// noinspection JSCheckFunctionSignatures

const User = require("../models/userM");
const Foreigner = require("../models/foreignerM");
const { login_validation } = require("../validation/loginValidation.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const LocalStorage = require("node-localstorage").LocalStorage;
let localStorage = new LocalStorage("./scratch");

const login = async (req, res, next) => {
	// validating input fields whether empty
	const { error } = login_validation(req.body);

	// checking whether the error is available
	if (error) {
		res.send({ message: error["details"][0]["message"] });
	} else {
		const userExist = await User.findOne({
			username: req.body.username,
		});

		const ForeignerExist = await Foreigner.findOne({
			username: req.body.username,
		});

		// if the user is a local passenger
		if (userExist) {
			if (userExist.type === "Passenger") {
				localStorage.setItem("Passenger", true);
				console.log("===================");
				console.log("Logged as a Passenger");
				console.log("===================");
			} else if (userExist.type === "Inspector") {
				localStorage.setItem("Inspector", true);
				console.log("=====================");
				console.log("Logged as a Inspector");
				console.log("=====================");
			} else if (userExist.type === "Driver") {
				localStorage.setItem("Passenger", true);
				console.log("===================");
				console.log("Logged as a Driver");
				console.log("===================");
			}

			// decrypting the password
			const decryptedPassword = CryptoJS.AES.decrypt(
				userExist.password,
				process.env.PASS_SECRET,
			).toString(CryptoJS.enc.Utf8);

			// password validation
			if (req.body.password !== decryptedPassword) {
				res.status(400).send({ message: "Wrong password" });
			}

			// generate json web tokens
			try {
				const token = await jwt.sign(
					{ _id: userExist.id },
					process.env.TOKEN_SECRET,
				);

				return res.header("authToken", token).send({
					authToken: token,
					role: "passenger",
					roleData: userExist,
				});
			} catch (error) {
				return res.status(400).send({ message: error });
			}
		} else if (ForeignerExist) {
			try {
				console.log("=====================");
				console.log("Logged as a Foreigner");
				console.log("=====================");
				localStorage.setItem("Foreigner", true);

				// decrypting the password
				const decryptedPassword = CryptoJS.AES.decrypt(
					ForeignerExist.password,
					process.env.PASS_SECRET,
				).toString(CryptoJS.enc.Utf8);

				// password validation
				if (req.body.password !== decryptedPassword) {
					res.status(400).send({ message: "Wrong password" });
				}

				// generate json web tokens
				try {
					const token = await jwt.sign(
						{ _id: ForeignerExist.id },
						process.env.TOKEN_SECRET,
					);

					return res.header("authToken", token).send({
						authToken: token,
						role: "foreigner",
						roleData: ForeignerExist,
					});
				} catch (error) {
					return res.status(400).send({ message: error });
				}
			} catch (e) {
				console.log("Error: ", e);
			}
		}
	}
};

let refreshTokens = [];

const logout = async (req, res) => {
	const TokenRefresh = req.params.authToken;

	localStorage.clear();

	try {
		refreshTokens = refreshTokens.filter(
			(token) => token !== TokenRefresh,
		);
		res.status(200).json("You are logged out successfully");
	} catch (err) {
		return res.status(400).send({ message: err });
	}
};

module.exports = { login, logout };
