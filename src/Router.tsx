import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Loginform } from "./pages/LoginForm";
import { NewUserForm } from "./pages/NewUserForm";
import { Pattern } from "./pages/Pattern";
import { PatternForm } from "./pages/PatternForm";
import { Patterns } from "./pages/Patterns";
import { RowCounter } from "./pages/RowCounter";
import { Settings } from "./pages/Settings";

const BASE_URL = "/TheStitchMarkerAssistant/";

export const router = createBrowserRouter([
  {
    path: BASE_URL,
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: BASE_URL,
        element: <Home />,
      },
      {
        path: BASE_URL + "login",
        element: <Loginform />,
      },
      {
        path: BASE_URL + "newUser",
        element: <NewUserForm />,
      },
      {
        path: BASE_URL + "patterns",
        element: <Patterns />,
      },
      {
        path: BASE_URL + "pattern:id",
        element: <Pattern />,
      },
      {
        path: BASE_URL + "patternForm",
        element: <PatternForm />,
      },
      {
        path: BASE_URL + "rowcounter",
        element: <RowCounter />,
      },
      {
        path: BASE_URL + "settings",
        element: <Settings />,
      },
    ],
  },
]);
