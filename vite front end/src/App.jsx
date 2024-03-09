import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddUser, { action as addUserAction } from "./routes/AddUser";
import Profile from "./routes/Profile";
import Layout from "./components/Layout";
import Login, { action as addLoginAction } from "./routes/Login";
import { AuthProvider } from "./AuthContext";
import LogOut from './routes/LogOut'
import "./App.css";
import Home from "./routes/Home";
import AddLinks, { action as addLinkAction } from "./routes/AddLinks";

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
        action: addLoginAction,
      },
      {
        path: "/links/add",
        element: <AddLinks />,
        action: addLinkAction,
      },
      {
      path: "/logout",
      element: <LogOut/>
      },

      // {
      //   path: '/sign-up',
      //   element: <AddUser/>,
      // }
    ],
  },
]);

function App() {
  return <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>;
}


export default App;
