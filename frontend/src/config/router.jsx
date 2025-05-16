import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic"
import Home from "../pages/Home"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ],
  },
]);
