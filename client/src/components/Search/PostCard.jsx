import { Link } from "react-router-dom";

export default function PostCard({ post, data }) {
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

  function convertPayloadWithTimeSince(post) {
    return timeSince(post.createdAt);
  }

  const convertedPayload = convertPayloadWithTimeSince(post);

  return (
    post && (
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="flex flex-row px-2 py-3 mx-3">
          <div className="w-auto h-auto rounded-full">
            <img
              className="w-12 h-12 object-cover rounded-full shadow cursor-pointer"
              alt="User avatar"
              src={
                !post.userId.profilePicture
                  ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' class='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
                  : post.userId.profilePicture
              }
            />
          </div>
          <div className="flex flex-col mb-2 ml-4 mt-1">
            <div className="text-gray-600 text-sm font-semibold">
              {post.userId && post.userId.username}
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
              {post && post.image === "" ? (
                <img className="hidden" alt="" />
              ) : (
                <img
                  className="h-full w-full object-cover "
                  src={post.image}
                  alt=""
                />
              )}
            </div>
          </div>
        </div>

        <div className="text-gray-500 text-sm mb-6 mx-3 px-2">{post.desc}</div>
      </div>
    )
  );
}
