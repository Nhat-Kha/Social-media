import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiList from "../../api/apiList";
import PostCard from "./PostCard";
import UserCard from "./UserCard";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");

    if (searchTermFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
      });
    }
    // console.log("all", sidebarData);

    const fetchPost = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${apiList.getAllPost}?${searchQuery}`);
      console.log("res", res);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        // console.log("data posts", data.posts);
        // console.log("data users", data.users);
        setPosts(data.posts);
        setSearchUser(data.users);
        setLoading(false);
        if (data.posts.length === 5) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPost();
  }, [location.search]);

  useEffect(() => {
    const fecthUser = async () => {
      try {
        const res = await fetch(apiList.getUser);
        if (res.ok) {
          const data = await res.json();
          setUsers(data?.users);
          //   console.log(data.users);
          //   console.log(users);
        }
      } catch (error) {
        console.log({ error });
      }
    };
    fecthUser();
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }
    if (e.target.id === "user") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, user: order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("searchTerm", sidebarData.user);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const newData = users.filter((user) => user._id === posts[0]?.userId);

  return (
    <div>
      <div className="flex-col grid grid-cols-12 md:flex-row">
        <div className="col-start-1 col-end-6 p-5 border-b md:border-r md:min-h-screen border-gray-500">
          <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
            <div className="w-full pl-2 pt-3 max-md:hidden">
              <h1 className="text-3xl font-semibold">User:</h1>
              {!loading && searchUser.length === 0 && (
                <p className="text-xl text-gray-500">No user found.</p>
              )}
              {loading && <p className="text-xl text-gray-500">Loading...</p>}
              {!loading &&
                searchUser &&
                searchUser.map((user) => (
                  <div key={user._id} className="p-2">
                    <UserCard user={user} />
                  </div>
                ))}
            </div>
          </form>
        </div>
        <div className="w-full col-start-6 col-end-13">
          <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 ">
            Posts results:
          </h1>
          <div className="p-7 flex flex-wrap gap-4">
            {!loading && posts.length === 0 && (
              <p className="text-xl text-gray-500">No post found.</p>
            )}
            {loading && <p className="text-xl text-gray-500">Loading...</p>}
            {!loading &&
              posts &&
              posts.map((post) => (
                <PostCard key={post._id} post={post} data={newData} />
              ))}
            {showMore && (
              <button
                // onClick={handleShowMore}
                className="text-teal-500 text-lg hover:underline p-7 w-full"
              >
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
