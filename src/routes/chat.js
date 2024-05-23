const express = require("express");
const chatCtrl = require("../controller/ChatController");

const router = express.Router();

router.post("/", chatCtrl.createChat);
router.get("/:userId", chatCtrl.userChat);
router.get("/find/:firstId/:secondId", chatCtrl.findChat);

module.exports = router;
