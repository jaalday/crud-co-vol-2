import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddUser, { action as addUserAction } from "./routes/AddUser";
import Profile from "./routes/Profile";
import Layout from "./components/Layout";
import Login from "./routes/Login";

import "./App.css";
import Home from "./routes/Home";
import AddLinks from "./routes/AddLinks";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/users/add",
        element: <AddUser />,
        action: addUserAction,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/links/add",
        element: <AddLinks />,
      },

      // {
      //   path: '/sign-up',
      //   element: <AddUser/>,
      // }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
