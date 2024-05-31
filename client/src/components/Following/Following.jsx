import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/Selector/Selector";
import apiList from "../../api/apiList";
import { followUser, unfollowUser } from "../../redux/actions/UserAction";
import User from "./User/User";
import FollowModal from "./FollowModal/FollowModal";

export default function Following({ location }) {
  const user = useSelector(userSelector);
  // console.log(user);

  const [modal, setModal] = useState(false);
  const [mainUser, setMainUser] = useState([]);

  useEffect(() => {
    const users = async () => {
      try {
        const res = await fetch(apiList.getUser);
        if (res.ok) {
          const data = await res.json();
          console.log("data:", data.users);
          const filterUser = data.users.filter((u) => u._id !== user.user._id);

          setMainUser(filterUser);
          // console.log({mainUser});
        }
      } catch (error) {
        console.log({ error });
      }
    };
    users();
  }, [user]);

  const newMainUser = mainUser.slice(0, 3);

  return (
    <div className="bg-white shadow mt-4 rounded-lg p-4">
      <h3 className="text-gray-600 text-sm font-semibold mb-4">Following</h3>
      {!location
        ? newMainUser.length > 0 &&
          newMainUser.map((use) => {
            if (use._id !== user._id) {
              return <User use={use} key={use._id} />;
            } else {
              return null;
            }
          })
        : mainUser.length > 0 &&
          mainUser.map((use) => {
            if (use._id !== user._id) {
              return <User use={use} key={use._id} />;
            } else {
              return null;
            }
          })}
      {!location ? (
        <span
          onClick={() => setModal(true)}
          className="flex justify-center items-center cursor-pointer"
        >
          Show More
        </span>
      ) : (
        ""
      )}
      <FollowModal modalOpened={modal} setModalOpened={setModal} />
    </div>
  );
}
