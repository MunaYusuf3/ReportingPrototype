import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_BASE } from "../utils";

function SoftReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!post) {
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

  const handleSoftReport = async () => {
    setIsSubmitting(true);
    setError("");

    const payload = {
      platform: post.reported_account?.platform,
      username: post.reported_account?.username,
      content_id: post.content_id,
      content_type: post.content_type,
      text: post.text,
      category: "soft_report",
      description: notes?.trim()
        ? `Soft report notes: ${notes}`
        : "User flagged this behaviour for review without selecting a formal category.",
      reporter_id: "",
    };

    try {
      const response = await fetch(`${API_BASE}/api/reports/submit/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit");


      navigate("/report/success");
    } catch (err) {
      console.error("Soft report error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Flag behaviour for review</h1>
        <p className="page-subtitle">
          Use this if something feels concerning but you are not sure it clearly
          fits a report category. You do not need to be certain a rule has been
          broken.
        </p>

        <div className="summary-box">
          <div className="summary-item">
            <strong>Platform:</strong> {post.reported_account?.platform}
          </div>
          <div className="summary-item">
            <strong>User:</strong> {post.reported_account?.username}
          </div>
          <div className="summary-item">
            <strong>Content:</strong> {post.text}
          </div>
        </div>

        <h2 className="section-title">What this does</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">Flags the behaviour quietly</div>
            <div className="option-description">
              The person you are reporting will not be notified. Multiple flags
              from different users help moderators spot patterns.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">No formal category needed</div>
            <div className="option-description">
              You do not need to choose a specific category or be certain
              something was wrong to raise a concern.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Helps over time</div>
            <div className="option-description">
              Soft reports can help identify behaviour that becomes more serious
              across multiple interactions.
            </div>
          </div>
        </div>

        <h2 className="section-title">Optional note</h2>
        <label htmlFor="softReportNote">Why are you concerned? (optional)</label>
        <textarea
          id="softReportNote"
          placeholder="Briefly describe what felt concerning. You can leave this blank."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {error && <div className="error-message">{error}</div>}

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() => navigate("/report/options", { state: { post } })}
            disabled={isSubmitting}
          >
            Go back
          </button>
          <button
            className="button-primary"
            onClick={handleSoftReport}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit flag"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SoftReportPage;
