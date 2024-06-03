import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function OnlyAdminPrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.rest.isAdmin === true ? (
    <Outlet />
  ) : (
    <Navigate to="/sign-in" />
  );
}

function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

function PrivateRouteLogin() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Navigate to="/" /> : <Outlet />;
}

export { OnlyAdminPrivateRoute, PrivateRoute, PrivateRouteLogin };
