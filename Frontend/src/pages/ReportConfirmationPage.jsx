import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { reasons, affected, frequency, apiUrl } from "../utils";
import ProgressBar from "../components/ProgressBar";

//shows a summary of what information is shared with moderators before fully submitting the report
function ReportConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const post = location.state?.post;
  const reason = location.state?.reason;
  const affectedWho = location.state?.affected;
  const pattern = location.state?.pattern;
  const extraDetails = location.state?.extraDetails;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!post || !reason) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">Something went wrong</h1>
          <p className="page-subtitle">Go back and start the report again.</p>
          <div className="button-row">
            <button className="button-secondary" onClick={() => navigate("/")}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const formatDescription = () => {
    const who = affectedWho || "Not provided";
    const freq = pattern || "Not provided";
    const extra = extraDetails?.trim() || "None";
    return `Affected: ${who}\nPattern: ${freq}\nExtra details: ${extra}`;
  };

  const submitReport = async () => {
    setLoading(true);
    setError("");

    const reportData = {
      platform: post.reported_account?.platform,
      username: post.reported_account?.username,
      content_id: post.content_id,
      content_type: post.content_type,
      text: post.text,
      category: reason,
      description: formatDescription(),
      reporter_id: "",
    };

    try {
      const response = await fetch(`${apiUrl}/api/reports/submit/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit report");

      navigate("/report/success", { state: { post, reason } });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <ProgressBar current={4} total={5} />
        <h1 className="page-title">Confirm your report</h1>
        <p className="page-subtitle">
          Check the details below before sending. You can go back to make changes.
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
            disabled={loading}
            onClick={() =>
              navigate("/report/nextsteps", {
                state: { post, reason, affected: affectedWho, pattern, extraDetails },
              })
            }
          >
            Go back
          </button>
          <button
            className="button-primary"
            disabled={loading}
            onClick={submitReport}
          >
            {loading ? "Submitting..." : "Confirm report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportConfirmationPage;