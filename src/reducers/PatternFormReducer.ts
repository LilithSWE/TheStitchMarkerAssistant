import { ActionPatternForm } from "../models/ActionPatternForm";
import { Pattern } from "../models/Pattern";

export const PatternFormReducer = (
  state: Pattern,
  action: ActionPatternForm
): Pattern => {
  if (action.type === "UPDATE") {
    state = action.payload;
    return action.payload;
  } else if (action.type === "CLEAR") {
    state = {
      headline: "",
      img: "",
      notes: "",
      type: "",
      parts: [
        {
          headline: "",
          rows: [
            {
              row_start: 1,
              amount_of_rows: 1,
            },
          ],
        },
      ],
    };
    return action.payload;
  }
  return state;
};
