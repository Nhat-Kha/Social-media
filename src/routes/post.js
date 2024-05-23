const express = require("express");
const postCtrl = require("../controller/PostController");

const router = express.Router();

router.post("/", postCtrl.createPost);
router.get("/:id", postCtrl.getPost);
router.put("/:id", postCtrl.updatePost);
router.delete("/:id", postCtrl.deletePost);
router.put("/:id/like", postCtrl.likePost);
router.get("/:id/timeline", postCtrl.getTimelinePosts);

module.exports = router;
