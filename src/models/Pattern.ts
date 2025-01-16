import { Part } from "./Part";

export type Pattern = {
  created_at?: string;
  headline: string;
  notes?: string;
  img: string;
  pattern_id?: string;
  type?: string;
  user_id?: string;
  parts: Part[];
};
