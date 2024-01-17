import {
  createBrowserRouter
} from "react-router-dom";

import App from "../../App";
import ErrorPage from '../Error/ErrorPage'
import LoginForm from "../../pages/LoginPage/LoginForm";


const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginForm />,
      errorElement: <ErrorPage />,
    },
]);

export default router;