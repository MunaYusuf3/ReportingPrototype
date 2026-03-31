// //add to back end that when it goes to this page , an extra report is added to the perpetrators account

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

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
        : "User flagged this behaviour for review without selecting a formal report category.",
      reporter_id: "",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reports/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit soft report");
      }

      navigate("/report/success");
    } catch (err) {
      console.error("Soft report error:", err);
      setError(err.message || "Something went wrong while submitting.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Flag behaviour for review</h1>
        <p className="page-subtitle">
          Use this option if something feels concerning but you are not sure it
          clearly fits a report category.
        </p>

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

        <h2 className="section-title">What this does</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">Flags the behaviour</div>
            <div className="option-description">
              This raises a concern for review without requiring a full formal
              report category.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Helps identify repeated patterns</div>
            <div className="option-description">
              Soft reports can help highlight behaviour that may become more
              serious over time.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Lets you act even if unsure</div>
            <div className="option-description">
              You do not need to be certain that a rule has been broken to raise
              a concern.
            </div>
          </div>
        </div>

        <h2 className="section-title">Optional note</h2>
        <label htmlFor="softReportNote">Why are you concerned?</label>
        <textarea
          id="softReportNote"
          placeholder="Add a short note if you want to explain why this feels concerning."
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
            {isSubmitting ? "Submitting..." : "Submit soft report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SoftReportPage;