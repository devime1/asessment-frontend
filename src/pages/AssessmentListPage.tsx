import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAssessmentStore } from "../stores/useAssessmentStore";
import AssessmentList from "../components/AssessmentList";

export default function AssessmentListPage() {
  const navigate = useNavigate();

  const assessments = useAssessmentStore((s) => s.assessments);
  const isFetching = useAssessmentStore((s) => s.isFetching);
  const fetchAssessments = useAssessmentStore((s) => s.fetchAssessments);
  const assessmentError = useAssessmentStore((s) => s.error);
  const clearAssessmentError = useAssessmentStore((s) => s.clearError);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  return (
    <div className="page-shell">
      <div className="mobile-frame">
        {assessmentError && (
          <div className="error-banner">
            <span>{assessmentError}</span>
            <button onClick={clearAssessmentError}>×</button>
          </div>
        )}
        <div className="page-header">
          <p className="header-title">Field Safety</p>
          <h1>Assessments</h1>
          <p className="description">
            Select an assessment to view its summary.
          </p>
        </div>

        <AssessmentList
          assessments={assessments}
          isFetching={isFetching}
          onSelectAssessment={(id) => navigate(`/assessment/${id}`)}
        />
      </div>
    </div>
  );
}
