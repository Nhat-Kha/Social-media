import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Button, Textarea } from "flowbite-react";
import apiList from "../../api/apiList";

export default function Comment({ comment, onLike, onEdit, onDelete }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const { currentUser } = useSelector((state) => state.auth.authData);

  const [mainUser, setMainUser] = useState([]);

  useEffect(() => {
    const user = async () => {
      try {
        const res = await fetch(apiList.getUser);
        if (res.ok) {
          const data = await res.json();
          setMainUser(data.users);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    user();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`${apiList.getUser}${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getUser();
  }, [comment]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const newMainUser = mainUser.filter((use) => use._id === comment.userId);

  const handleSave = async () => {
    try {
      const res = await fetch(`${apiList.editComment}${comment._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.token}`,
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return newMainUser.map((use) => (
    <div className="flex pb-4" key={use._id}>
      <img
        className="rounded-full h-8 w-8 mr-2 mt-1 "
        src={
          !use.profilePicture
            ? "data:image/svg+xml,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false' className='block h-full w-full fill-current'%3E%3Cpath d='m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z'/%3E%3C/svg%3E"
            : use.profilePicture
        }
        alt={use.username}
      />
      <div className="w-full">
        <div className="bg-gray-100 rounded-lg px-4 pt-2 pb-2.5 w-full">
          <div className="font-semibold text-sm leading-relaxed">
            {use ? `${use.username}` : "anonymous user"}
          </div>

          {isEditing ? (
            <>
              <Textarea
                className="mb-2"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="flex justify-end gap-2 text-xs">
                <Button
                  type="button"
                  size="sm"
                  gradientDuoTone="purpleToBlue"
                  onClick={handleSave}
                >
                  Save
                </Button>
                <Button
                  type="button"
                  size="sm"
                  gradientDuoTone="purpleToBlue"
                  outline
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="text-xs leading-snug md:leading-normal">
                {comment.content}
              </div>
              <div className="flex items-center pt-2 text-xs max-w-fit gap-2">
                <button
                  type="button"
                  onClick={() => onLike(comment._id)}
                  className={`text-gray-400 hover:text-blue-500 ${
                    currentUser &&
                    comment.likes.includes(currentUser.rest._id) &&
                    "!text-blue-500"
                  }`}
                >
                  <FaThumbsUp className="text-sm" />
                </button>
                <p className="text-gray-400">
                  {comment.numberOfLikes > 0 &&
                    comment.numberOfLikes +
                      " " +
                      (comment.numberOfLikes === 1 ? "like" : "likes")}
                </p>
                {currentUser &&
                  (currentUser.rest._id === comment.userId ||
                    currentUser.rest.isAdmin) && (
                    <>
                      <button
                        type="button"
                        onClick={handleEdit}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(comment._id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </>
                  )}
              </div>
            </>
          )}
        </div>
        <div className="text-xs  mt-0.5 text-gray-500">
          {moment(comment.createdAt).fromNow()}
        </div>
      </div>
    </div>
  ));
}
