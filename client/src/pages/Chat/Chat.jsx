import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { userSelector } from "../../redux/Selector/Selector";
import { userChats } from "../../api/ChatRequests";
import ChatConversation from "../../components/Chat/Conversation/ChatConversation";
import ChatBox from "../../components/Chat/ChatBox";

export default function Chat() {
  const dispatch = useDispatch();
  const socket = useRef();
  const { user } = useSelector(userSelector);

  console.log("user:", user._id);

  const [chats, setChats] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        console.log("data:", data);
        setChats(data);
      } catch (error) {
        console.log({ error });
      }
    };

    getChats();
  }, [user._id]);

  // connect
  useEffect(() => {
    const url = "http://localhost:3300";
    console.log(`Connecting to WebSocket server at ${url}`);
    socket.current = io(url);
    console.log(`WebSocket connected: ${socket.current}`);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (user) => {
      setOnlineUsers(user);
    });
  }, [user._id]);

  //send message
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  //Get Message
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      console.log("data message: ", data);
      setReceivedMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    console.log("chat:", chat);
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);

    console.log("chatMember:", chatMember);
    // console.log("user:", user._id);
    return online ? true : false;
  };

  return (
    <div className="flex h-full text-gray-800">
      <div className="h-full w-full grid grid-cols-12">
        {/* LEFT SIDE */}

        <div className="flex-none col-span-3 fixed flex-col py-8 pl-6 pr-2 h-full w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">{user.username}</div>
          </div>
          <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
            <div className="h-20 w-20 rounded-full border overflow-hidden">
              <img
                src={
                  !user.profilePicture
                    ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
                    : user.profilePicture
                }
                alt="Avatar"
                className="h-full w-full"
              />
            </div>
            <div className="text-sm font-semibold mt-2">{user.firstname}</div>
            <div className="text-xs text-gray-500">
              {user.livesin || "No update"}, {user.country || "No update"}
            </div>
            <div className="flex flex-row items-center mt-3">
              <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                <div className="h-3 w-3 bg-white rounded-full self-end mr-1"></div>
              </div>
              <div className="leading-none ml-1 text-xs">Active</div>
            </div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center justify-between text-xs">
              <span className="font-bold">Active Conversations</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                4
              </span>
            </div>
            {/* show member chat */}
            {chats.map((chat, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <ChatConversation
                  data={chat}
                  currentUser={user._id}
                  online={checkOnlineStatus(chat)}
                />
              </div>
            ))}
            <div className="flex flex-row items-center justify-between text-xs mt-6">
              <span className="font-bold">Archivied</span>
              <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                7
              </span>
            </div>
            <div className="flex flex-col space-y-1 mt-4 -mx-2">
              <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                  H
                </div>
                <div className="ml-2 text-sm font-semibold">Henry Boyd</div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div class="flex-1 col-start-3 col-end-13 flex-col h-[41rem] w-full  pt-4 pl-4 pr-4">
          <ChatBox
            user={user}
            chat={currentChat}
            currentUser={user._id}
            setSendMessage={setSendMessage}
            receivedMessage={receivedMessage}
          />
        </div>
      </div>
    </div>
  );
}
