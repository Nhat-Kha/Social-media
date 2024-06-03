import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./components/Layout/Navbar/Navbar";
import Loading from "./components/container/LoadingPage";
import { useEffect, useRef, useState } from "react";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
import { io } from "socket.io-client";
import Layout from "./components/Layout/Layout";
import Search from "./components/Search/Search";

export default function App() {
  // const socket = useRef();

  const user = useSelector((state) => state.auth.authData);

  // const [onlineUsers, setOnlineUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3500);
  }, []);
  if (loading) {
    return <Loading />;
  }

  // useEffect(() => {
  //   const url = "http://localhost:3300";
  //   console.log(`Connecting to WebSocket server at ${url}`);
  //   socket.current = io(url);
  //   console.log(`WebSocket connected: ${socket.current}`);
  //   socket.current.emit("new-user-add", user._id);
  //   socket.current.on("get-users", (user) => {
  //     setOnlineUsers(user);
  //   });
  // }, [user._id]);
  return (
    <div
      className="App bg-gray-50 pt-20 min-h-screen"
      style={{
        height:
          window.location.href === "http://localhost:3000/chat"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      <Layout>
        <Routes>
          <Route
            exact
            path="/"
            element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="../auth" />}
          />
          <Route
            exact
            path="/auth"
            element={user ? <Navigate to="../home" /> : <Auth />}
          />
          <Route
            exact
            path="/chat"
            element={user ? <Chat /> : <Navigate to="../home" />}
          />
          <Route
            exact
            path="/profile/:id"
            element={user ? <Profile /> : <Navigate to="../auth" />}
          />
          <Route />
          <Route exact path="/search" element={<Search />} />

          <Route
            exact
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </Layout>
    </div>
  );
}
