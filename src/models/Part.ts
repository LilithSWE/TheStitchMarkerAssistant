import { Row } from "./Row";

export type Part2 = {
  pattern_id: string;
  headline: string;
  img: string;
  notes: string;
};

export type Part = {
  headline: string;
  img: string;
  notes: string;
  rows: Row[];
};
