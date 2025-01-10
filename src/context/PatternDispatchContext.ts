import { createContext, Dispatch } from "react";
import { ActionPattern } from "../models/ActionPattern";

export const PatternDispatchContext = createContext<Dispatch<ActionPattern>>(
  () => {
    return;
  }
);
