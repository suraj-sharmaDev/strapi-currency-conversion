import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
