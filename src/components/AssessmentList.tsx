import type { Assessment } from "../types/assessment";
import AssessmentListItem from "./AssessmentListItem";

type Props = {
  assessments: Assessment[];
  isFetching: boolean;
  onSelectAssessment: (id: string) => void;
};

export default function AssessmentList({
  assessments,
  isFetching,
  onSelectAssessment,
}: Props) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>All Assessments</h2>
      </div>

      {isFetching && <p className="state-text">Loading assessments...</p>}

      {!isFetching && assessments.length === 0 && (
        <p className="state-text">No assessments found.</p>
      )}

      <div className="stack">
        {assessments.map((assessment) => (
          <AssessmentListItem
            key={assessment.id}
            assessment={assessment}
            onClick={() => onSelectAssessment(assessment.id)}
          />
        ))}
      </div>
    </section>
  );
}