import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <div className="mobile-frame">
        <header className="page-header">
          <p className="eyebrow">Error</p>
          <h1>Page Not Found</h1>
          <p className="meta">
            The page you are looking for does not exist.
          </p>
        </header>

        <button
          className="primary-button"
          onClick={() => navigate("/assessments")}
        >
          Go to Assessments
        </button>
      </div>
    </div>
  );
}