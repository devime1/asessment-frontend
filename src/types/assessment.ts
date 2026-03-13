import type { Hazard } from "./hazard";

export interface Assessment {
  id: string;
  title: string;
  status: string;
  review_date: string | null;
  notes: string | null;
  hazards: Hazard[];
}