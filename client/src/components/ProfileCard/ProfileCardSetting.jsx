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

  console.log({ user });

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col gap-1 text-center items-center">
        <h4>Profile Info</h4>
        <p className="font-semibold">{user.username}</p>
        {user._id === profileUserId ? (
          <div>
            <button
              data-modal-target="default-modal"
              data-modal-toggle="default-modal"
              class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
              onClick={() => setModalOpened(true)}
            >
              More
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
          <p className="text-black">102</p>
          <span className="text-gray-400">Posts</span>
        </div>
        <div className="font-semibold text-center mx-4">
          <p className="text-black">{user.followers.length}</p>
          <span className="text-gray-400">Followers</span>
        </div>
        <div className="font-semibold text-center mx-4">
          <p className="text-black">{user.following.length}</p>
          <span className="text-gray-400">Folowing</span>
        </div>
      </div>
    </div>
  );
}
