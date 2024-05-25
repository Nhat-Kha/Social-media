const express = require("express");
const CommentCtrl = require("../controller/CommentController");
const authMiddleWare = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/create", authMiddleWare, CommentCtrl.createComment);
router.get("/getPostComments/:postId", CommentCtrl.getPostComments);
router.put("/likeComment/:commentId", authMiddleWare, CommentCtrl.likeComment);
router.put("/editComment/:commentId", authMiddleWare, CommentCtrl.editComment);
router.delete(
  "/deleteComment/:commentId",
  authMiddleWare,
  CommentCtrl.deleteComment
);
router.get("/getcomments", authMiddleWare, CommentCtrl.getcomments);

module.exports = router;
