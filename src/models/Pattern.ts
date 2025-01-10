import { Part } from "./Part";

export type Pattern = {
  user_id: string;
  headline: string;
  img: string;
  notes: string;
  type: string;
  parts: Part[];
};
