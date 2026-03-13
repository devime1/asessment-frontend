import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAssessmentStore } from "../stores/useAssessmentStore";
import { useHazardStore } from "../stores/useHazardStore";
import type { Hazard } from "../types/hazard";
import AssessmentHeader from "../components/AssessmentHeader";
import HazardList from "../components/HazardList";

const EMPTY_HAZARDS: Hazard[] = [];

export default function AssessmentPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const assessmentId = String(id);

  const assessment = useAssessmentStore((s) => s.assessment);
  const isFetchingAssessment = useAssessmentStore((s) => s.isFetching);
  const fetchAssessmentById = useAssessmentStore((s) => s.fetchAssessment);

  const hazardsByAssessment = useHazardStore(
    (s) => s.hazards[assessmentId] ?? EMPTY_HAZARDS,
  );
  const isFetchingHazards = useHazardStore((s) => s.isFetching);
  const error = useHazardStore((s) => s.error);
  const clearError = useHazardStore((s) => s.clearError);
  const fetchHazards = useHazardStore((s) => s.fetchHazards);
  const removeHazard = useHazardStore((s) => s.removeHazard);

  useEffect(() => {
    if (!Number.isNaN(assessmentId)) {
      fetchAssessmentById(assessmentId);
      fetchHazards(assessmentId);
    }
  }, [assessmentId, fetchAssessmentById, fetchHazards]);

  if (Number.isNaN(assessmentId)) {
    return <div>Invalid assessment ID.</div>;
  }

  return (
    <div className="page-shell">
      <div className="mobile-frame">
        {error && (
          <div className="error-banner">
            <span>{error}</span>
            <button type="button" onClick={clearError}>
              ×
            </button>
          </div>
        )}
        <div className="page-topbar">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/assessments")}
          >
            ← Back to Assessments
          </button>
        </div>

        <AssessmentHeader
          assessment={assessment}
          isLoading={isFetchingAssessment}
        />

        <HazardList
          assessmentId={assessmentId}
          hazards={hazardsByAssessment}
          isFetching={isFetchingHazards}
          onRemoveHazard={removeHazard}
        />
      </div>
    </div>
  );
}
