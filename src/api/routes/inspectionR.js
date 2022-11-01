const router = require("express").Router();
const {
	addInspection,
	getInspection,
	updateInspection,
	deleteInspection,
	getoneInspection,
} = require("../controller/inspectionC");
const Event = require("../models/inspectionM");

//define user routes
router.post("/add", addInspection);
router.get("/all", getInspection);
router.put("/update/:id", updateInspection);
router.delete("/delete/:id", deleteInspection);
router.get("/:id", getoneInspection);

module.exports = router;
