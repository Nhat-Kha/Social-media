import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTimelinePosts } from "../../redux/actions/PostAction";
import Post from "./Post/Post";
import Skeleten from "../Skeleten/Skeleten";
import {
  loadSelector,
  postSelector,
  userSelector,
} from "../../redux/Selector/Selector";

export default function PostSide() {
  const dispatch = useDispatch();

  const user = useSelector(userSelector);
  const post = useSelector(postSelector);
  const loading = useSelector(loadSelector);

  const [load, setLoading] = useState(loading);

  useEffect(() => {
    setTimeout(() => setLoading(true), 2000);
  }, []);

  useEffect(() => {
    dispatch(getTimelinePosts(user.user._id));
  }, [dispatch, user]);

  if (!post || post.length === 0) return "No Posts";

  return !load ? (
    <Skeleten />
  ) : (
    post &&
      post.map &&
      post.map((post) => {
        return <Post data={post} key={post._id} />;
      })
  );
}
