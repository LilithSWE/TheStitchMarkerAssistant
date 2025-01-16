import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useReducer } from "react";
import { PatternContext } from "./context/PatternContext";
import { PatternDispatchContext } from "./context/PatternDispatchContext";
import { PatternReducer } from "./reducers/PatternReducer";
import { PatternFormReducer } from "./reducers/PatternFormReducer";
import { PatternFormContext } from "./context/PatternFormContext";
import { PatternFormDispatchContext } from "./context/PatternFormDispatchContext";

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
    headline: "Pattern headline",
    img: "",
    notes: "",
    type: "",
    parts: [
      {
        headline: "Part headline",
        rows: [
          {
            row_start: 1,
            amount_of_rows: 1,
          },
        ],
      },
    ],
  });

  return (
    <>
      <PatternContext.Provider value={pattern}>
        <PatternDispatchContext.Provider value={dispatch}>
          <PatternFormContext.Provider value={patternForm}>
            <PatternFormDispatchContext.Provider value={formDispatch}>
              <RouterProvider router={router}></RouterProvider>
            </PatternFormDispatchContext.Provider>
          </PatternFormContext.Provider>
        </PatternDispatchContext.Provider>
      </PatternContext.Provider>
    </>
  );
}
