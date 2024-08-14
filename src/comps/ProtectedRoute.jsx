import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const user = useAuth();
  console.log(user);
  if (!user?.current) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
