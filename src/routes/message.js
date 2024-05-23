const express = require("express");
const messageCtrl = require("../controller/MessageController");

const router = express.Router();

router.post("/", messageCtrl.addMessage);
router.get("/:chatId", messageCtrl.getMessage);

module.exports = router;
