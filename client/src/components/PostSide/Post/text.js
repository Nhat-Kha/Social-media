import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { likePost } from "../../../api/PostsRequests";
import apiList from "../../../api/apiList";
import CommentSection from "../../Comment/CommentSection";
import { userSelector } from "../../../redux/Selector/Selector";

export default function Post({ data }) {
  const user = useSelector(userSelector);

  const userId = user?._id;
  const initialLikes = data?.likes || [];

  const [liked, setLiked] = useState(initialLikes.includes(userId));
  const [likes, setLikes] = useState(initialLikes.length);

  const [users, setUsers] = useState([]);

  const handleLike = () => {
    likePost(data._id, user.user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const res = await fetch(apiList.getUser);
        if (res.ok) {
          const data = await res.json();
          setUsers(data.users);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    fecthUser();
  }, []);

  const newData = users.filter((user) => user._id === data.userId);
  const newLikeData = users.filter((u) => data.likes.includes(u._id));

  function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
  }

  function convertPayloadWithTimeSince(data) {
    return timeSince(data.createdAt);
  }

  const convertedPayload = convertPayloadWithTimeSince(data);

  // console.log("data:", data);
  // console.log("liked:", liked);
  // console.log("users:", users);
  // console.log("newData:", newData);
  // console.log("newLikeData:", newLikeData);

  return (
    data && (
      <div className="bg-white shadow rounded-lg mb-6">
        {newData.map((user) => (
          <div key={user._id}>
            <div className="flex flex-row px-2 py-3 mx-3">
              <div className="w-auto h-auto rounded-full">
                <img
                  className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
                  alt="User avatar"
                  src={
                    !user.profilePicture
                      ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
                      : user.profilePicture
                  }
                />
              </div>
              <div className="flex flex-col mb-2 ml-4 mt-1">
                <div className="text-gray-600 text-sm font-semibold">
                  {user && user.username}
                </div>
                <div className="flex w-full mt-1">
                  <div className="text-gray-400 font-thin text-xs">
                    {convertedPayload}
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-100"></div>
            <div className="text-gray-400 font-medium text-sm mb-7 mt-6 mx-3 px-2">
              <div className="grid grid-cols-6 col-span-2   gap-2  ">
                <div className=" overflow-hidden rounded-xl col-span-3 max-h-[14rem]">
                  {data && data.image === "" ? (
                    ""
                  ) : (
                    <img
                      className="h-full w-full object-cover "
                      src={data.image}
                      alt=""
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="text-gray-500 text-sm mb-6 mx-3 px-2">
              {data.desc}
            </div>
          </div>
        ))}
        <div className="flex justify-start mb-4 border-t border-gray-100">
          <div className="flex w-full mt-1 pt-2 pl-5">
            <span
              className="bg-white transition ease-out duration-300 hover:text-red-500 border w-8 h-8 px-2 pt-2 
              text-center rounded-full text-gray-400 cursor-pointer mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="14px"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                ></path>
              </svg>
            </span>
            {newLikeData &&
              newLikeData.map &&
              newLikeData.map((nu) => (
                <img
                  key={nu._id}
                  className="inline-block object-cover w-8 h-8 text-white border-2 border-white rounded-full shadow-sm cursor-pointer"
                  src={
                    nu.profilePicture
                      ? nu.profilePicture
                      : "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
                  }
                  alt=""
                />
              ))}
          </div>
          <div className="flex justify-end w-full mt-1 pt-2 pr-5">
            <span
              className="transition ease-out duration-300 hover:bg-blue-50 bg-blue-100 w-8 h-8 px-2 py-2 text-center 
              rounded-full text-blue-400 cursor-pointer mr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                width="14px"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                ></path>
              </svg>
            </span>
            <span
              onClick={handleLike}
              className={`transition ease-out duration-300 hover:bg-red-200 h-8 px-2 py-2 text-center rounded-full cursor-pointer ${
                liked ? "bg-red-500 text-white" : "bg-gray-100 text-gray-100"
              }`}
            >
              <svg
                className="h-4 w-4"
                fill={liked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  className={liked ? "text-white" : "text-red-500"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex w-full border-t border-gray-100">
          <div className="mt-3 mx-5 flex flex-row text-xs">
            <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
              Comments:<div className="ml-1 text-gray-400 text-ms"> 30</div>
            </div>
            <div className="flex text-gray-700 font-normal rounded-md mb-2 mr-4 items-center">
              Views: <div className="ml-1 text-gray-400 text-ms"> 60k</div>
            </div>
          </div>
          <div className="mt-3 mx-5 w-full flex justify-end text-xs">
            <div className="flex text-gray-700  rounded-md mb-2 mr-4 items-center">
              Likes: <div className="ml-1 text-gray-400  text-ms"> {likes}</div>
            </div>
          </div>
        </div>

        <CommentSection postId={data._id} user={user} />
      </div>
    )
  );
}
