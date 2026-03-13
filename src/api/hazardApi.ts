import { api } from "./client";
import type { Hazard } from "../types/hazard";

export const getHazards = (assessmentId: string) => {
  return api.get(`/assessments/${assessmentId}/hazards`);
};

export const updateHazard = (id: string, payload: Partial<Hazard>) => {
  return api.put(`/hazards/${id}`, payload);
};

export const createHazard = (
  assessmentId: string,
  payload: Partial<Hazard>,
) => {
  return api.post(`${assessmentId}/hazards`, payload);
};

export const deleteHazard = (hazardId: string) => {
  return api.delete(`/hazards/${hazardId}`);
};
  