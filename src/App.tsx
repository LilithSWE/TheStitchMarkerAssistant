import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { useReducer } from "react";
import { PatternContext } from "./context/PatternContext";
import { PatternDispatchContext } from "./context/PatternDispatchContext";
import { PatternReducer } from "./reducers/PatternReducer";

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

  return (
    <>
      <PatternContext.Provider value={pattern}>
        <PatternDispatchContext.Provider value={dispatch}>
          <RouterProvider router={router}></RouterProvider>
        </PatternDispatchContext.Provider>
      </PatternContext.Provider>
    </>
  );
}
