import { Part } from "./Part";

export type Pattern2 = {
  user_id: string;
  headline: string;
  img: string;
  notes: string;
  type: string;
};

export type Pattern = {
  user_id: string;
  headline: string;
  img: string;
  notes: string;
  type: string;
  parts: Part[];
};
