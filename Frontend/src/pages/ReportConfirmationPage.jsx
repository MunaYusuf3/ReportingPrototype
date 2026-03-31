import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatReason, formatAffected, formatPattern, API_BASE } from "../utils";

function ReportConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const post = location.state?.post;
  const reason = location.state?.reason;
  const affected = location.state?.affected;
  const pattern = location.state?.pattern;
  const extraDetails = location.state?.extraDetails;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!post || !reason) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">Missing report information</h1>
          <p className="page-subtitle">
            Go back and complete the report details first.
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
  const buildDescription = () =>
    [
      `Affected: ${affected || "Not provided"}`,
      `Pattern: ${pattern || "Not provided"}`,
      `Extra details: ${extraDetails?.trim() || "None"}`,
    ].join("\n");

  const handleConfirm = async () => {
    setIsSubmitting(true);
    setError("");

    const payload = {
      platform: post.reported_account?.platform,
      username: post.reported_account?.username,
      content_id: post.content_id,
      content_type: post.content_type,
      text: post.text,
      category: reason,
      description: buildDescription(),
      reporter_id: "", 
    };

    try {
      const response = await fetch(`${API_BASE}/api/reports/submit/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit report");

      navigate("/report/success", { state: { post, reason } });
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Confirm your report</h1>
        <p className="page-subtitle">
          Review the details below before sending. You can go back to make
          changes.
        </p>
        <h2 className="section-title">Content</h2>
        <div className="summary-box">
          <div className="summary-item">
            <strong>Platform:</strong> {post.reported_account?.platform}
          </div>
          <div className="summary-item">
            <strong>User:</strong> {post.reported_account?.username}
          </div>
          <div className="summary-item">
            <strong>Content type:</strong> {post.content_type}
          </div>
          <div className="summary-item">
            <strong>Content:</strong> {post.text}
          </div>
        </div>
        <h2 className="section-title">Your report</h2>
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
            {extraDetails?.trim() ? extraDetails : "None provided"}
          </div>
        </div>

        <p className="helper-text">
          Your report is anonymous. The person you are reporting will not be
          told who submitted this report.
        </p>

        {error && <div className="error-message">{error}</div>}

        <div className="button-row">
          <button
            className="button-secondary"
            disabled={isSubmitting}
            onClick={() =>
              navigate("/report/nextsteps", {
                state: { post, reason, affected, pattern, extraDetails },
              })
            }
          >
            Go back
          </button>
          <button
            className="button-primary"
            disabled={isSubmitting}
            onClick={handleConfirm}
          >
            {isSubmitting ? "Submitting..." : "Confirm report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportConfirmationPage;
