const router = require("express").Router();
const {
	addPayment,
	getPayment,
	updatePayment,
	deletePayment,
	getonePayment,
} = require("../controller/paymentC");
const Event = require("../models/paymentM");

//define user routes
router.post("/add", addPayment);
router.get("/all", getPayment);
router.put("/update/:id", updatePayment);
router.delete("/delete/:id", deletePayment);
router.get("/:id", getonePayment);

module.exports = router;
