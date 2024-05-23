const express = require("express");
const authCtrl = require("../controller/AuthController");

const router = express.Router();

router.post("/signup", authCtrl.Signup);
router.post("/signin", authCtrl.Signin);

module.exports = router;
