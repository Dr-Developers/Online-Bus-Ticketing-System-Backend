const router = require("express").Router();
const {
	userAdd,
	deleteUser,
	getOneUser,
	retrieveAllUsers,
	updateUser,
} = require("../controller/foreignerC");

// defining user routes
router.post("/add", userAdd);
router.delete("/delete/:id", deleteUser);
router.get("/", retrieveAllUsers);
router.get("/:id", getOneUser);
router.put("/update/:id", updateUser);

module.exports = router;
