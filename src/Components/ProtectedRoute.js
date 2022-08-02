import { Navigate } from "react-router-dom";
// Context
import UserContext from "../UserContext";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const user = useContext(UserContext)
  if (!user.token) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
