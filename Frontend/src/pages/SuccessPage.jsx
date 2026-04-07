import { useLocation, useNavigate } from "react-router-dom";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSoftReport = location.state?.isSoftReport;

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">
          {isSoftReport ? "Flag submitted" : "Report submitted"}
        </h1>
        <p className="page-subtitle">
          {isSoftReport
            ? "Your flag has been logged. Thank you for letting us know."
            : "Your report has been received and will be looked into."}
        </p>

        <div className="success-message">
          {isSoftReport
            ? "✓ Your flag was submitted successfully."
            : "✓ Your report was sent successfully. Your identity has not been shared with the reported user."}
        </div>

        {!isSoftReport && (
          <>
            <h2 className="section-title">What happens next</h2>
            <div className="option-list">
              <div className="option-card-static">
                <div className="option-title">1. Your report is in the queue</div>
                <div className="option-description">
                  Reports are usually reviewed within 24–48 hours. More complex
                  cases may take a little longer.
                </div>
              </div>

              <div className="option-card-static">
                <div className="option-title">2. A moderator will review it</div>
                <div className="option-description">
                  They will look at the content and the context you provided to
                  decide whether action is needed.
                </div>
              </div>

              <div className="option-card-static">
                <div className="option-title">3. Action will be taken if needed</div>
                <div className="option-description">
                  If the content breaks the rules, it may be removed or the
                  account may be restricted.
                </div>
              </div>
            </div>

            <div className="summary-box">
              <p>
                While you wait, you can block or mute the user to limit any
                further contact.
              </p>
            </div>
          </>
        )}

        {isSoftReport && (
          <div className="summary-box">
            <p>
              If the behaviour continues you can submit a full report or flag
              them again. You can also block or mute them at any time.
            </p>
          </div>
        )}

        <p className="helper-text" style={{ marginTop: "12px" }}>
          <span
            onClick={() => navigate("/report/support")}
            style={{ color: "#0d9488", cursor: "pointer", textDecoration: "underline" }}
          >
            View support resources →
          </span>
        </p>

        <div className="button-row">
          <button className="button-primary" onClick={() => navigate("/")}>
            Back to feed
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;