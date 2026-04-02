import { useLocation, useNavigate } from "react-router-dom";
import { reasons, affected, frequency } from "../utils";
import ProgressBar from "../components/ProgressBar";

function NextStepsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const post = location.state?.post;
  const reason = location.state?.reason;
  const affectedWho = location.state?.affected;
  const pattern = location.state?.pattern;
  const extraDetails = location.state?.extraDetails;

  if (!post || !reason) {
    return (
      <div className="page">
        <div className="card">
          <ProgressBar current={3} total={5} />
          <h1 className="page-title">Something went wrong</h1>
          <p className="page-subtitle">
            Go back and complete the earlier steps first.
          </p>
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
        <ProgressBar current={3} total={5} />
        <h1 className="page-title">What happens after you report</h1>
        <p className="page-subtitle">
          Before you confirm, here is what to expect once your report is sent.
        </p>

        <div className="summary-box">
          <div className="summary-item">
            <strong>Category:</strong> {reasons(reason)}
          </div>
          <div className="summary-item">
            <strong>Who is affected:</strong> {affected(affectedWho)}
          </div>
          <div className="summary-item">
            <strong>Behaviour pattern:</strong> {frequency(pattern)}
          </div>
          <div className="summary-item">
            <strong>Additional details:</strong>{" "}
            {extraDetails?.trim() ? extraDetails : "Not provided"}
          </div>
        </div>

        <h2 className="section-title">What happens next</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">1. Your report will be reviewed</div>
            <div className="option-description">
              Reports are usually looked at within 24–48 hours. The context
              you provided helps moderators understand the situation.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">2. Action may be taken</div>
            <div className="option-description">
              If the content breaks the rules, action will be taken. We may
              not always be able to tell you the outcome but your report
              does make a difference.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">3. You can still protect yourself</div>
            <div className="option-description">
              You don't have to wait. You can block or mute this person
              while your report is being reviewed.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">4. Support is there if you need it</div>
              <div className="option-description">
                If this has affected you, support resources are available.
                You don't have to deal with this alone.
              </div>
              <span
                onClick={() => navigate("/report/support")}
                style={{ fontSize: "13px", color: "#7c3aed", cursor: "pointer", textDecoration: "underline", marginTop: "6px", display: "block" }}
              >
              View support resources →
              </span>
            </div>
          </div>

        <p className="helper-text" style={{ marginTop: "12px" }}>
          Your identity will not be shared with the person you are reporting.
        </p>

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() =>
              navigate("/report/moreinfo", { state: { post, reason } })
            }
          >
            Go back
          </button>
          <button
            className="button-primary"
            onClick={() =>
              navigate("/report/confirmation", {
                state: { post, reason, affected: affectedWho, pattern, extraDetails },
              })
            }
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default NextStepsPage;
