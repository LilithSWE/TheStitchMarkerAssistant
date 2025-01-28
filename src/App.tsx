import { Suspense, lazy, useMemo } from "react";
import { Route, HashRouter, Routes } from "react-router-dom";
import { useReducer } from "react";
import { PatternContext } from "./context/PatternContext";
import { PatternDispatchContext } from "./context/PatternDispatchContext";
import { PatternReducer } from "./reducers/PatternReducer";
import { PatternFormReducer } from "./reducers/PatternFormReducer";
import { PatternFormContext } from "./context/PatternFormContext";
import { PatternFormDispatchContext } from "./context/PatternFormDispatchContext";

// Lazy-loaded components with original import paths
const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home }))
);
const Loginform = lazy(() =>
  import("./pages/LoginForm").then((module) => ({ default: module.Loginform }))
);
const NewUserForm = lazy(() =>
  import("./pages/NewUserForm").then((module) => ({
    default: module.NewUserForm,
  }))
);
const PatternForm = lazy(() =>
  import("./pages/PatternForm").then((module) => ({
    default: module.PatternForm,
  }))
);
const Patterns = lazy(() =>
  import("./pages/Patterns").then((module) => ({ default: module.Patterns }))
);
const RowCounter = lazy(() =>
  import("./pages/RowCounter").then((module) => ({
    default: module.RowCounter,
  }))
);
const Settings = lazy(() =>
  import("./pages/Settings").then((module) => ({ default: module.Settings }))
);
const SinglePattern = lazy(() =>
  import("./pages/SinglePattern").then((module) => ({
    default: module.SinglePattern,
  }))
);
const ConfirmRegistration = lazy(() =>
  import("./pages/ConfirmRegistration").then((module) => ({
    default: module.ConfirmRegistration,
  }))
);
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword").then((module) => ({
    default: module.ForgotPassword,
  }))
);
const ForgotPasswordForm = lazy(() =>
  import("./pages/ForgotPasswordForm").then((module) => ({
    default: module.ForgotPasswordForm,
  }))
);

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
    img: "./images/knitting.png",
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

  const patternValue = useMemo(() => pattern, [pattern]);
  const patternDispatchValue = useMemo(() => dispatch, [dispatch]);
  const patternFormValue = useMemo(() => patternForm, [patternForm]);
  const patternFormDispatchValue = useMemo(() => formDispatch, [formDispatch]);

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
        <PatternContext.Provider value={patternValue}>
          <PatternDispatchContext.Provider value={patternDispatchValue}>
            <PatternFormContext.Provider value={patternFormValue}>
              <PatternFormDispatchContext.Provider
                value={patternFormDispatchValue}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Loginform />} />
                    <Route path="/newUser" element={<NewUserForm />} />
                    <Route path="/confirm" element={<ConfirmRegistration />} />
                    <Route
                      path="/forgotPassword"
                      element={<ForgotPassword />}
                    />
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
                </Suspense>
              </PatternFormDispatchContext.Provider>
            </PatternFormContext.Provider>
          </PatternDispatchContext.Provider>
        </PatternContext.Provider>
      </HashRouter>
    </>
  );
}
