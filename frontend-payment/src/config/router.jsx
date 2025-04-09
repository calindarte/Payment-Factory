import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../layouts/LayoutPublic"
import Home from "../pages/Home";
import PaymentManager from "../components/PaymentManager";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPublic />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path:"/gestionar",
        element:<PaymentManager />

      }
    ],
  },
]);
