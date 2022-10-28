const router = require("express").Router();
const { userAdd } = require("../controller/userC");

// defining user routes
router.post("/add", userAdd);

module.exports = router;
