import { Outlet } from "react-router-dom";
import Navbar from "../pages/Navbar";
import Fotter from "../pages/Fotter";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
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
