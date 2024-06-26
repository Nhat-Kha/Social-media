import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/Selector/Selector";
import { followUser, unfollowUser } from "../../../redux/actions/UserAction";

export default function User({ use }) {
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const userId = user?.user._id;
  // console.log({ userId });
  const initialFollow = use?.followers || [];

  const [following, setFollowing] = useState(initialFollow.includes(userId));
  // console.log({ initialFollow });

  const handleFollow = () => {
    console.log("start mainUser id:", use);

    following
      ? dispatch(unfollowUser(use?._id, user))
      : dispatch(followUser(use?._id, user));
    setFollowing((prev) => !prev);
  };

  // console.log({ following });

  return (
    <>
      <ul className="flex flex-col items-start justify-center space-x-2 w-full">
        <li className="w-full">
          <div className="flex justify-between items-center">
            <div className="flex flex-row justify-center items-center">
              <a className="block bg-white p-1 rounded-full" href="#!">
                <img
                  alt=""
                  className="w-16 rounded-full"
                  src={
                    !use.profilePicture
                      ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
                      : use.profilePicture
                  }
                />
              </a>
              <div className="flex flex-col cursor-default">
                <span className="text-sm text-gray-500 font-medium">
                  {use.firstname}
                </span>
                <span className="text-base text-black font-semibold">
                  {use.username}
                </span>
              </div>
            </div>
            <button
              className={
                following
                  ? "h-[2rem] w-[8rem] transition duration-200 font-medium px-[20px] border-2 bg-gray-400 hover:bg-gray-500 text-white hover:text-gray-50 text-md rounded-md cursor-pointer"
                  : "h-[2rem] w-[8rem] transition duration-200 font-medium px-[20px] bg-green-300 text-white rounded-md hover:bg-green-500"
              }
              onClick={handleFollow}
            >
              {following ? "Unfollow" : "Follow"}
            </button>
          </div>
        </li>
      </ul>
    </>
  );
}
