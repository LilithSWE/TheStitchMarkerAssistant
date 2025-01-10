import { Row } from "./Row";

export type FetchedPart = {
  part_id: string;
  pattern_id: string;
  headline: string;
  img: string;
  notes: string;
  rows: Row[];
  user_id: string;
};
