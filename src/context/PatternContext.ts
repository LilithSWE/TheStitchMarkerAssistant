import { createContext } from "react";
import { FetchedPattern } from "../models/FetchedPattern";

export const PatternContext = createContext<FetchedPattern>({
  created_at: "",
  headline: "",
  img: "",
  notes: "",
  pattern_id: "",
  type: "",
  user_id: "",
});
