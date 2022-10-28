const bcryptjs = require("bcryptjs");
const User = require("../models/userM");
const { user_validation } = require("../validation/userValidation");

// creating a new user in the DB
const userAdd = async (req, res) => {
	let id = 1;
	// validating inputs whether they are empty
	const { error } = user_validation(req.body);

	// if error occurred display the error msg
	if (error) {
		res.send({ message: error["details"][0]["message"] });
	} else {
		// checking whether the user already exist or not
		const UserExist = await User.findOne(
			{ email: req.body.email },
			{ number: req.body.number },
		);

		if (UserExist) {
			return res
				.status(400)
				.send({ message: "User Already Exist!" });
		} else {
			// encrypting the password
			const salt = await bcryptjs.getSalt(5);
			const encryptedPassword = await bcrypt.hash(
				req.body.password,
				salt,
			);

			const user = new User({
				userID: id,
				name: req.body.name,
				email: req.body.email,
				nicType: req.body.nicType,
				number: req.body.number,
				phoneNumber: req.body.phoneNumber,
				username: req.body.username,
				password: encryptedPassword,
				type: req.body.type,
			});

			// testing
			console.log("user: ", user);

			try {
				const savedUser = user.save();
				console.log("User Saved Successfully!");
				res.send(savedUser);
				id = id + 1;
			} catch (error) {
				res.send({ message: error });
			}
		}
	}
};

module.exports = { userAdd };
