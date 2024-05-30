import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/Selector/Selector";
import apiList from "../../api/apiList";
import { followUser, unfollowUser } from "../../redux/actions/UserAction";
import User from "./User/User";

export default function Following() {
  const user = useSelector(userSelector);

  const [modal, setModal] = useState(false);
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

  const newMainUser = mainUser.slice(0, 3);

  console.log("mainUser id:", newMainUser);

  return (
    <div className="bg-white shadow mt-4 rounded-lg p-4">
      <h3 className="text-gray-600 text-sm font-semibold mb-4">Following</h3>
      {newMainUser.length > 0 &&
        newMainUser.map((use) => {
          if (use._id !== user._id) {
            return <User use={use} key={use._id} />;
          } else {
            return null;
          }
        })}
      <span className="flex justify-center items-center">Show More</span>
    </div>
  );
}
