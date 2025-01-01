import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";
import { Home } from "./pages/Home";
import { Loginform } from "./components/singular/LoginForm";
import { NewUserForm } from "./components/singular/NewUserForm";

const BASE_URL = "/TheStitchMarkerAssistant";

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
        path: BASE_URL + "/login",
        element: <Loginform />,
      },
      {
        path: BASE_URL + "/newUser",
        element: <NewUserForm />,
      },
      /*
      {
        path: "/TheStitchMarkerAssistant/patterns",
        element: <Patterns />,
      },
      {
        path: "/TheStitchMarkerAssistant/pattern:id" ,
        element: <Pattern />,
      },
      {
        path: "/TheStitchMarkerAssistant/patternform",
        element: <PatternForm />,
      },
      {
        path: "/TheStitchMarkerAssistant/rowcounter",
        element: <RowCounter />,
      },
      {
        path: "/TheStitchMarkerAssistant/InstructionalVideos",
        element: <InstructionalVideos />,
      },
      */
    ],
  },
]);
