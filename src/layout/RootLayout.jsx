import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Fotter from "../pages/Fotter";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import AuthContext from "../provider/authContext";
import Loadding from "../components/Loadding";

const RootLayout = () => {
  const { authLoading } = useContext(AuthContext);
  if (authLoading) return <Loadding></Loadding>;
  return (
    <main className=" max-w-7xl mx-auto">
      <Toaster position="top-right" />
      <Navbar></Navbar>

      <Outlet></Outlet>
      <Fotter></Fotter>
    </main>
  );
};

export default RootLayout;
