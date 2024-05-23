const express = require("express");

const userCtrl = require("../controller/UserController");
const authMiddleWare = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/:id", userCtrl.getUser);
router.get("/", userCtrl.getAllUser);
router.put("/:id", authMiddleWare, userCtrl.updateUser);
router.delete("/:id", authMiddleWare, userCtrl.deleteUser);
router.put("/:id/follow", authMiddleWare, userCtrl.followUser);
router.put("/:id/unfollow", authMiddleWare, userCtrl.unfollowUser);

module.exports = router;
