const router = require("express").Router();
const { login, logout } = require("../controller/loginC");
const verifyToken = require("../verifyToken/verifyToken");

// defining user routes
router.post("/login", login);
router.post("/logout", verifyToken, logout);

module.exports = router;
