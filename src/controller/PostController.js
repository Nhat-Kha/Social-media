const PostModel = require("../model/postModel");
const UserModel = require("../model/userModel");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json({ message: "Post Created Successfully", newPost });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === true) {
      const post = await PostModel.findById(id);
      console.log({ id });
      res.status(200).json(post);
    } else {
      res.status(200).json("Not found post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post updated!");
    } else {
      res.status(403).json("Authentication failed!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted.");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const likePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(id);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTimelinePosts = async (req, res) => {
  const userId = req.params.id;
  console.log({ userId });
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });
    console.log({ currentUserPosts });

    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId.createFromHexString(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    console.log({ followingPosts });

    res
      .status(200)
      .json(currentUserPosts.concat(...followingPosts[0].followingPosts));
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
};
