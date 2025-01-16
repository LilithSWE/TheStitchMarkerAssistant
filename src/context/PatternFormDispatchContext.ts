import { createContext, Dispatch } from "react";
import { ActionPatternForm } from "../models/ActionPatternForm";

export const PatternFormDispatchContext = createContext<
  Dispatch<ActionPatternForm>
>(() => {
  return;
});
