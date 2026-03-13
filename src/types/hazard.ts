export type RiskLevel = "Low" | "Medium" | "High";

export interface Hazard {
  assessment_id: string;
  id: string;
  title: string;
  description?: string;
  risk_level?: RiskLevel;
  severity?: string;
  likelihood?: string;
  status?: string;
}
