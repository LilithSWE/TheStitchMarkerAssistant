import { Route, HashRouter, Routes } from "react-router-dom";
import { useReducer } from "react";
import { PatternContext } from "./context/PatternContext";
import { PatternDispatchContext } from "./context/PatternDispatchContext";
import { PatternReducer } from "./reducers/PatternReducer";
import { PatternFormReducer } from "./reducers/PatternFormReducer";
import { PatternFormContext } from "./context/PatternFormContext";
import { PatternFormDispatchContext } from "./context/PatternFormDispatchContext";
import { Home } from "./pages/Home";
import { Loginform } from "./pages/LoginForm";
import { NewUserForm } from "./pages/NewUserForm";
import { PatternForm } from "./pages/PatternForm";
import { Patterns } from "./pages/Patterns";
import { RowCounter } from "./pages/RowCounter";
import { Settings } from "./pages/Settings";
import { SinglePattern } from "./pages/SinglePattern";
import { ConfirmRegistration } from "./pages/ConfirmRegistration";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ForgotPasswordForm } from "./pages/ForgotPasswordForm";

export function App() {
  const [pattern, dispatch] = useReducer(PatternReducer, {
    created_at: "",
    headline: "",
    img: "",
    notes: "",
    pattern_id: "",
    type: "",
    user_id: "",
  });

  const [patternForm, formDispatch] = useReducer(PatternFormReducer, {
    headline: "",
    img: "./images/404.png",
    notes: "",
    type: "knitting",
    parts: [
      {
        part_id: 1,
        headline: "",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
          },
        ],
      },
    ],
  });

  const theme = localStorage.getItem("theme");
  const body = document.querySelector("#body");
  if (theme == "dark") {
    body?.classList.add("dark");
  } else {
    body?.classList.add("light");
  }

  return (
    <>
      <HashRouter>
        <PatternContext.Provider value={pattern}>
          <PatternDispatchContext.Provider value={dispatch}>
            <PatternFormContext.Provider value={patternForm}>
              <PatternFormDispatchContext.Provider value={formDispatch}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Loginform />} />
                  <Route path="/newUser" element={<NewUserForm />} />
                  <Route path="/confirm" element={<ConfirmRegistration />} />
                  <Route path="/forgotPassword" element={<ForgotPassword />} />
                  <Route
                    path="/forgotPasswordForm"
                    element={<ForgotPasswordForm />}
                  />
                  <Route path="/patterns" element={<Patterns />} />
                  <Route path="/pattern/:id" element={<SinglePattern />} />
                  <Route
                    path="/patternForm/:newPattern"
                    element={<PatternForm />}
                  />
                  <Route path="/rowcounter" element={<RowCounter />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </PatternFormDispatchContext.Provider>
            </PatternFormContext.Provider>
          </PatternDispatchContext.Provider>
        </PatternContext.Provider>
      </HashRouter>
    </>
  );
}
