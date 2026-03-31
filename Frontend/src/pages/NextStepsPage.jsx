import { useLocation, useNavigate } from "react-router-dom";

function NextStepsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const post = location.state?.post;
  const reason = location.state?.reason;
  const affected = location.state?.affected;
  const pattern = location.state?.pattern;
  const extraDetails = location.state?.extraDetails;

  if (!post || !reason) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">No content selected</h1>
          <p className="page-subtitle">
            Go back and choose content before continuing.
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

  const formatReason = (value) => {
    const labels = {
      harassment_or_bullying: "Harassment or bullying",
      hate_or_discrimination: "Hate or discrimination",
      threats_or_intimidation: "Threats or intimidation",
      misinformation: "False or misleading information",
      scams_or_impersonation: "Scams or impersonation",
      sexual_content: "Sexual abuse or exploitation",
      something_else: "Other",
    };

    return labels[value] || value;
  };

  const formatAffected = (value) => {
    const labels = {
      me: "This targets me",
      someone_else: "This targets someone else",
      prefer_not_to_say: "Prefer not to say",
      "": "Not provided",
    };

    return labels[value] || value;
  };

  const formatPattern = (value) => {
    const labels = {
      once: "This happened once",
      repeated: "This is repeated behaviour",
      "": "Not provided",
    };

    return labels[value] || value;
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">What happens next?</h1>
        <p className="page-subtitle">
          Before you submit, here’s what to expect after your report is sent.
        </p>

        <div className="summary-box">
          <div className="summary-item">
            <strong>Category:</strong> {formatReason(reason)}
          </div>
          <div className="summary-item">
            <strong>Who is affected:</strong> {formatAffected(affected)}
          </div>
          <div className="summary-item">
            <strong>Behaviour pattern:</strong> {formatPattern(pattern)}
          </div>
          <div className="summary-item">
            <strong>Additional details:</strong>{" "}
            {extraDetails?.trim() ? extraDetails : "Not provided"}
          </div>
        </div>

        <h2 className="section-title">After submission</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">Your report will be reviewed</div>
            <div className="option-description">
              The information you provided will help moderators understand the
              context of the issue.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Action may depend on severity</div>
            <div className="option-description">
              Reports involving repeated harm, threats, or exploitation may be
              prioritised for review.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">You can still protect yourself</div>
            <div className="option-description">
              Depending on the platform, you may also want to block, mute, or
              limit contact while the report is being reviewed.
            </div>
          </div>
        </div>

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() =>
              navigate("/report/moreinfo", {
                state: { post, reason },
              })
            }
          >
            Go back
          </button>

          <button
            className="button-primary"
            onClick={() =>
              navigate("/report/confirmation", {
                state: {
                  post,
                  reason,
                  affected,
                  pattern,
                  extraDetails,
                },
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