import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../redux/actions/PostAction";
import Post from "./Post/Post";

export default function PostSide() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.authData);
  const { posts, loading } = useSelector((state) => ({
    posts: state.post.posts,
    loading: state.post.loading,
  }));

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user]);

  if (!posts || posts.length === 0) return "No Posts";

  // if (id) posts = posts.filter((post) => post.userId === id);
  // const newPost = users.filter((user) => user._id === posts._id);

  // console.log("post:", posts);

  return (
    <>
      {loading
        ? "Fetching posts...."
        : posts &&
          posts.map &&
          posts.map((post) => {
            return <Post data={post} key={post._id} />;
          })}
    </>
  );
}
