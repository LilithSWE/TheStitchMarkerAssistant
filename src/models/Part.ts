import { Row } from "./Row";

export type Part = {
  part_id: number;
  pattern_id?: string;
  headline: string;
  img?: string;
  notes?: string;
  rows: Row[];
  user_id?: string;
};
