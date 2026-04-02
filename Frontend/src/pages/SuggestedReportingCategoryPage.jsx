import { useLocation, useNavigate } from "react-router-dom";
import { reasons } from "../utils";
import ProgressBar from "../components/ProgressBar";

function SuggestedReportingCategoryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const post = location.state?.post;
  const suggested = location.state?.suggested;

  if (!post || !suggested) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">Something went wrong</h1>
          <p className="page-subtitle">Go back and try again.</p>
          <div className="button-row">
            <button className="button-secondary" onClick={() => navigate("/")}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Suggested category</h1>
        <p className="page-subtitle">
          Based on your answers, this might be the best fit.
        </p>

        <div className="summary-box">
          <p>
            Based on your answers, this report may fall under:
          </p>
          <p>
            {reasons(suggested)}
          </p>
        </div>

        <p>
          Not quite right? You can go back and pick a different category instead.
        </p>

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() => navigate("/report/morehelp", { state: { post } })}
          >
            Go back
          </button>
          <button
            className="button-primary"
            onClick={() => navigate("/report/moreinfo", { state: 
                                                            { post, 
                                                              reason: suggested } })}
          >
            Use this category
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuggestedReportingCategoryPage;