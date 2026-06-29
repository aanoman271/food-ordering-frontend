import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Card from "../pages/Card";
import AdminDashbord from "../pages/AdminDashbord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/card",
        element: <Card></Card>,
      },
      {
        path: "/dashboard",
        element: <AdminDashbord></AdminDashbord>,
      },
    ],
  },
]);

export default router;
