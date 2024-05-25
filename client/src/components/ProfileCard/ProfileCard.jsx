import React from "react";
import { useSelector } from "react-redux";

export default function ProfileCard() {
  const { user } = useSelector((state) => state.auth.authData);

  console.log("user", user);

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col gap-1 text-center items-center">
        <img
          className="h-32 w-32 bg-white p-2 rounded-full shadow mb-4"
          src={
            !user.profilePicture
              ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' class='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
              : user.profilePicture
          }
          alt=""
        />
        <p className="font-semibold">{user.username}</p>
        <div className="text-sm leading-normal text-gray-400 flex justify-center items-center">
          <svg
            viewBox="0 0 24 24"
            className="mr-1"
            width="16"
            height="16"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {user.livesin}, California
        </div>
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
