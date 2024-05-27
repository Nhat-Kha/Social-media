import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../redux/actions/PostAction";
import Post from "./Post/Post";
import Skeleten from "../Skeleten/Skeleten";

export default function PostSide() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.authData);
  const { post, loading } = useSelector((state) => ({
    post: state.post.posts,
    loading: state.post.loading,
  }));

  // const [load, setLoading] = useState(loading);

  // useEffect(() => {
  //   setTimeout(() => setLoading(true), 2000);
  // }, []);

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [dispatch, user]);

  if (!post || post.length === 0) return "No Posts";

  return loading ? (
    <Skeleten />
  ) : (
    post &&
      post.map &&
      post.map((post) => {
        return <Post data={post} key={post._id} />;
      })
  );
}
