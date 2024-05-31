import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import * as UserAPI from "../../api/UserRequests";
import ProfileModal from "./ProfileModal";

export default function ProfileCardSetting() {
  const dispatch = useDispatch();
  const params = useParams();
  const profileUserId = params.id;

  console.log(profileUserId);
  const [modalOpened, setModalOpened] = useState(false);
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.auth.authData);
  const { posts } = useSelector((state) => ({
    posts: state.post.posts,
  }));

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching");
        const profileUser = await UserAPI.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [profileUserId, user]);

  if (!posts || posts.length === 0) return "No Posts";
  const newPost = posts.filter((post) => post.userId === user._id);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col gap-1 text-center items-center">
        <h4 className="text-gray-600 text-sm font-semibold">Profile Info</h4>
        <img
          className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
          src={
            !user.profilePicture
              ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
              : user.profilePicture
          }
          alt=""
        />
        <p className="font-semibold cursor-default">{user.username}</p>
        {user._id === profileUserId ? (
          <div>
            <button
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setModalOpened(true)}
            >
              Edit profile
            </button>
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex justify-center items-center gap-2 my-3">
        <div className="font-semibold text-center mx-4">
          <p className="text-black cursor-default">{newPost.length}</p>
          <span className="text-gray-400 cursor-default">Posts</span>
        </div>
        <div className="font-semibold text-center mx-4">
          <p className="text-black cursor-default">{user.followers.length}</p>
          <span className="text-gray-400 cursor-default">Followers</span>
        </div>
        <div className="font-semibold text-center mx-4">
          <p className="text-black cursor-default">{user.following.length}</p>
          <span className="text-gray-400 cursor-default">Folowing</span>
        </div>
      </div>
    </div>
  );
}
