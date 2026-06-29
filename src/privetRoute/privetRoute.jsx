import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../provider/authContext";
import Loading from "../components/Loading";

const PrivateRoute = ({ children }) => {
  const { user, authLoading } = useContext(AuthContext);

  if (authLoading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
