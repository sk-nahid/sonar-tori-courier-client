import { createBrowserRouter } from "react-router";
import RootLayOut from "../layouts/RootLayOut";
import Home from "../pages/Home";
import AuthLayOut from "../layouts/AuthLayOut";
import Login from "../components/AuthComponents/Login";
import CreateAccount from "../components/AuthComponents/CreateAccount";
import Coverage from "../pages/Coverage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayOut,
    children: [
      {
        index: true,
        Component:Home,
      },
      {
        path: "/coverage",
        Component:Coverage,
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayOut,
    children: [
      {
        path: '/login',
        Component:Login,
        
      },
      {
        path: '/create-account',
        Component: CreateAccount,
      }
    ]
  }
]);