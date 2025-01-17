import { createContext } from "react";
import { Pattern } from "../models/Pattern";

export const PatternFormContext = createContext<Pattern>({
  headline: "",
  img: "",
  notes: "",
  type: "",
  parts: [
    {
      part_id: 0,
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
