import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getTimelinePosts } from "../../redux/actions/PostAction";
import Post from "./Post/Post";

export default function PostSide() {
  const params = useParams();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth.authData);
  let { posts, loading } = useSelector((state) => state.post);

  console.log(params.id);
  console.log({ posts });

  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (!posts || !posts.length) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);

  return (
    <>
      {loading
        ? "Fetching posts...."
        : posts &&
          posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
    </>
  );
}
