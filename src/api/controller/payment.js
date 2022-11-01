const Payment = require("../models/paymentM");
const { payment_validation } = require("../validation/paymentValidation");


let Id = 1;

//add payment function
const addPayment = async (req, res) => {
	//const validate = localStorage.getItem("isAdmin");

	//if (validate === "true") {
		//validate the payment input fields
		const { error } = payment_validation(req.body);
		if (error) {
			res.send({ message: error["details"][0]["message"] });
		}

		// //to check payment already exist
		// const paymentExist = await Payment.findOne({
		// 	paymentId: req.body.paymentId,
		// });
        // const emailExist = await Payment.findOne({
        //     email: req.body.email,
        // })
		// if (paymentExist && emailExist) {
		// 	return res
		// 		.status(400)
		// 		.send({ message: "Payment already exist" });
		// }

		//assign data to the model
		const payment = new Payment({
			paymentID: `P00${Id}`,
			amount: req.body.amount,
			email: req.body.email,
			holderNam: req.body.holderNam,
			cardNumber: req.body.cardNumber,
			cvv: req.body.cvv,
            expDate: req.body.expDate,
		});

		try {
			//save the data in the database
			const savedPayment = await payment.save();
			res.send(savedPayment);
            Id += 1;
		} catch (error) {
			//error handling
			res.status(400).send({ message: error });
		}
	// } else {
	// 	return res
	// 		.status(403)
	// 		.json("You do not have permission to access this");
	// }
};

const getPayment = async (req, res) => {
	try {
		const payment = await Payment.find();
		res.send(payment);
	} catch (error) {
		res.status(400).send({ message: error });
	}
};

const updatePayment = async (req, res) => {
	//const validate = localStorage.getItem("isAdmin");

	// if (validate == "true") {
 	    const paymentId = req.params.id;

		try {
			const payment = await Payment.findById(paymentId);
			if (!payment) {
				res.status(404).json("No Payment Found");
			}

			const {
				paymentID,
				amount,
				email,
				holderName,
				cardNumber,
				cvv,
                expDate,
			} = req.body;
			const updatePayment = await Payment.findByIdAndUpdate(
				paymentId,
				{
					paymentID,
					amount,
					email,
					holderName,
					cardNumber,
					cvv,
                    expDate,
				},
			);

			res.status(200).json(updatePayment);
		} catch (err) {
			res.status(400).send({ message: err });
		}
	// } else {
	// 	return res
	// 		.status(403)
	// 		.json("You do not have permission to access this");
	// }
};

const deletePayment = async (req, res) => {
	//const validate = localStorage.getItem("isAdmin");

	//if (validate === "true") {
		const paymentId = req.params.id;

		try {
			const payment = await Payment.findById(paymentId);

			if (!payment) {
				res.status(404).json("Payment Not Found");
			}

			const deletedPayment = await Payment.findByIdAndDelete(paymentId);
			res.status(200).json(deletedPayment);
		} catch (err) {
			res.status(400).json(err.message);
		}
	// } else {
	// 	return res
	// 		.status(403)
	// 		.json("You do not have permission to access this");
	// }
};

const getonePayment = async (req, res) => {
	try {
		const payment = await Payment.findOne({ _id: req.params.id });

		if (!payment) {
			res.status(404).json("Payment Not Found");
		}
		res.status(200).json(payment);
	} catch (err) {
		res.status(400).json(err.message);
	}
};

module.exports = {
	addPayment,
	getPayment,
	updatePayment,
	deletePayment,
	getonePayment,
}; //export functions
