import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../provider/authContext";
import Loadding from "../components/Loadding";

const AdminRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);
  if (authLoading) {
    return <Loadding />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin
  return children;
};

export default AdminRoute;
