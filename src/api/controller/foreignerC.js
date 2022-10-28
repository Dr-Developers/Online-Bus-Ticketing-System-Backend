// noinspection UnreachableCodeJS

const CryptoJS = require("crypto-js");
const Foreigner = require("../models/foreignerM");
const { foreigner_validation } = require("../validation/foriegnerValidation");

let userI = 0;

// creating a new user in the DB
const userAdd = async (req, res) => {
	// validating inputs whether they are empty
	const { error } = foreigner_validation(req.body);

	// if error occurred display the error msg
	if (error) {
		return res.send({ message: error["details"][0]["message"] });
	} else {
		// checking whether the user already exist or not
		const EmailExist = await Foreigner.findOne({ email: req.body.email });

		const NICExist = await Foreigner.findOne({ number: req.body.number });

		const UsernameExist = await Foreigner.findOne({
			username: req.body.username,
		});

		// taking the last document of the mongo User collection
		const last = await Foreigner.find().sort({ _id: -1 });

		// checking whether the array is not empty
		if (!(last.length === 0)) {
			// console.log("Last: ", parseInt(last[0].userID.split("0")[1]));
			userI = parseInt(last[0].userID.split("0")[1]);
		}

		if (EmailExist || NICExist) {
			return res
				.status(400)
				.send({ message: "User Already Exist!" });
		} else if (UsernameExist) {
			return res
				.status(400)
				.send({ message: "Username Already Exist!" });
		} else {
			// encrypting the password
			const encryptedPassword = CryptoJS.AES.encrypt(
				req.body.password,
				process.env.PASS_SECRET,
			).toString();

			const user = new Foreigner({
				userID: "U0" + (userI + 1),
				name: req.body.name,
				email: req.body.email,
				nicType: req.body.nicType,
				number: req.body.number,
				phoneNumber: req.body.phoneNumber,
				username: req.body.username,
				password: encryptedPassword,
				type: req.body.type,
			});

			try {
				const savedUser = user.save();
				console.log("========================");
				console.log("User Saved Successfully!");
				console.log("========================");
				return res.status(200).send({ savedUser: user });
			} catch (error) {
				return res.status(400).send({ message: error });
			}
		}
	}
};

const retrieveAllUsers = async (req, res) => {
	try {
		const users = await Foreigner.find();
		return res.status(200).send({ users });
	} catch (error) {
		return res.status(400).send({ message: error });
	}
};

const getOneUser = async (req, res) => {
	try {
		const user = await Foreigner.findOne({ _id: req.params.id });

		if (!user) {
			return res.status(404).send({ message: "User Not Found!" });
		} else {
			return res.status(200).send({ user });
		}
	} catch (error) {
		return res.status(400).send({ message: error });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await Foreigner.findById(req.params.id);
		if (!user) {
			return res.status(404).send({ message: "User Not Found!" });
		} else {
			const deletedUser = await Foreigner.findByIdAndDelete(
				req.params.id,
			);

			console.log("==========================");
			console.log("User Deleted Successfully!");
			console.log("==========================");

			return res.status(200).send({ deletedUser });
		}
	} catch (error) {
		return res.status(400).send({ message: error });
	}
};

const updateUser = async (req, res) => {
	const paramsID = req.params.id;
	try {
		const user = await Foreigner.findById(paramsID);
		if (!user) {
			return res.status(404).send({ message: "User Not Found!" });
		} else {
			const {
				name,
				email,
				nicType,
				number,
				phoneNumber,
				username,
				password,
				type,
			} = req.body;

			const updatedUser = await Foreigner.findByIdAndUpdate(paramsID, {
				name,
				email,
				nicType,
				number,
				phoneNumber,
				username,
				password,
				type,
			});

			console.log("==========================");
			console.log("User Updated Successfully!");
			console.log("==========================");

			return res.status(200).send({ updatedUser });
		}
	} catch (error) {
		return res.status(400).send({ message: error });
	}
};

/*
 * exporting functions
 */
module.exports = {
	userAdd,
	retrieveAllUsers,
	getOneUser,
	deleteUser,
	updateUser,
};
