import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Loading from "./components/container/LoadingPage";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";

export default function App() {
  const user = useSelector((state) => state.auth.authData);
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 4000);
  // }, []);
  // if (loading) {
  //   return <Loading />;
  // }
  return (
    <div
      className="App bg-gray-100 pt-20"
      style={{
        height:
          window.location.href === "http://localhost:3000/chat"
            ? "calc(100vh - 2rem)"
            : "auto",
      }}
    >
      <Navbar />
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
    </div>
  );
}
