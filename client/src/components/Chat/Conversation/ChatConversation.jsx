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

  console.log("userData:", userData);
  console.log("online:", online);

  return (
    <div>
      <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
        <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
          <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
            <img
              src={
                userData?.profilePicture
                  ? userData?.profilePicture
                  : "defaultProfile.png"
              }
              alt="Profile"
              className="followerImage"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div>
            <div className="ml-2 text-sm font-semibold">
              {userData?.firstname} {userData?.lastname}
            </div>
            <div className="ml-2 text-sm font-semibold">
              {online && <div>online</div>}
              <span style={{ color: online ? "#51e200" : "" }}>
                {online ? "Online" : "Offline"}
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
