const express = require("express");
const CommentCtrl = require("../controller/CommentController");
const verifyToken = require("../middleware/verifyToken");
// const authMiddleWare = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/create", verifyToken, CommentCtrl.createComment);
router.get("/getPostComments/:postId", CommentCtrl.getPostComments);
router.put("/likeComment/:commentId", verifyToken, CommentCtrl.likeComment);
router.put("/editComment/:commentId", verifyToken, CommentCtrl.editComment);
router.delete(
  "/deleteComment/:commentId",
  verifyToken,
  CommentCtrl.deleteComment
);
router.get("/getcomments", verifyToken, CommentCtrl.getcomments);

module.exports = router;
