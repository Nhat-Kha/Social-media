import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../../api/UserRequests";
import { saveUser } from "../../../redux/Reducers/ChatReducer";

export default function ChatConversation({ data, currentUser, online }) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userId = data.members.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        dispatch(saveUser(data));
      } catch (error) {
        console.log({ error });
      }
    };
    getUserData();
  }, [currentUser, data, dispatch]);

  return (
    <div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
            <img
              src={
                userData?.profilePicture
                  ? userData?.profilePicture
                  : "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
              }
              alt="Profile"
              className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full"
            />
          </div>
          <div>
            <div className="ml-2 text-sm font-semibold">
              {userData?.firstname} {userData?.lastname}
            </div>
            <div className="ml-2 text-sm font-semibold">
              {online && <div>online</div>}
              <span
                style={{
                  color: online
                    ? "#51e200"
                    : "rgb(156 163 175 / var(--tw-text-opacity))",
                }}
              >
                {online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
