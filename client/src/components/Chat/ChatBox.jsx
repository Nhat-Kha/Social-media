import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequests";
import { addMessages, getMessages } from "../../api/MessageRequests";

export default function ChatBox({
  chat,
  currentUser,
  setSendMessage,
  receivedMessage,
  user,
}) {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleChange = (newMessage) => {
    setNewMessage(newMessage.target.value);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUser]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };
    const receiverId = chat.members.find((id) => id !== currentUser);

    setSendMessage({ ...message, receiverId });

    try {
      const { data } = await addMessages(message);
      setMessages([...messages, data]);
      setNewMessage("");
      console.log("mess: completed");
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    console.log("Message Arrived: ", receivedMessage);
    if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
      setMessages((prev) => [...prev, receivedMessage]);
    }
  }, [receivedMessage]);

  const scroll = useRef();
  const imageRef = useRef();

  function timeSince(message) {
    const seconds = Math.floor((new Date() - new Date(message)) / 1000);

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

  function convertPayloadWithTimeSince(message) {
    return timeSince(message);
  }

  return (
    <>
      {chat ? (
        <div class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full w-full p-4">
          <div class="flex flex-col h-full overflow-x-auto mb-4">
            <div class="flex flex-col h-full">
              {messages.map((message) => (
                <div
                  class="grid grid-cols-12 gap-y-2"
                  key={message._id}
                  ref={scroll}
                >
                  <>
                    {message.senderId !== currentUser ? (
                      <div class="col-start-1 col-end-8 p-3 rounded-lg">
                        <div class="flex flex-row items-center">
                          <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            A
                          </div>

                          <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                            <div className="text-sm font-normal">
                              {message.text}
                            </div>
                            <div className="flex-none justify-start text-gray-400 text-xs">
                              {convertPayloadWithTimeSince(message.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div class="col-start-13 col-end-13 p-3 rounded-lg">
                        <div class="flex items-center justify-end self-end flex-row-reverse">
                          <img
                            src={
                              !user.profilePicture
                                ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
                                : user.profilePicture
                            }
                            alt="Avatar"
                            className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                          />
                          <div>
                            <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div className="text-sm font-normal">
                                {message.text}
                              </div>
                              <div className="flex justify-end text-gray-400 text-xs">
                                {convertPayloadWithTimeSince(message.createdAt)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              ))}
            </div>
          </div>
          <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
            <div>
              <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="flex-grow ml-4">
              <div class="relative w-full">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={handleChange}
                  onKeyDown={handleKey}
                  class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                />
                <button class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                  <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div class="ml-4">
              <button
                onClick={handleSend}
                class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
              >
                <span>Send</span>
                <span class="ml-2">
                  <svg
                    class="w-4 h-4 transform rotate-45 -mt-px"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )}
    </>
  );
}
