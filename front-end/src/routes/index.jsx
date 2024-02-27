import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./Auth";
import Home from "./Home";
import Checkout from "./Checkout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
