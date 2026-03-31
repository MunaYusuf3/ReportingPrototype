import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function ConfirmationPage() {
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

  const fullDescription = `
Affected: ${affected || "Not provided"}
Pattern: ${pattern || "Not provided"}
Extra details: ${extraDetails || "None"}
  `.trim();

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
      description: fullDescription,
      reporter_id: "",
    };

    console.log("Submitting payload:", payload);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reports/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit report");
      }

      navigate("/report/success", {
        state: {
          post,
          reason,
        },
      });
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.message || "Something went wrong while submitting the report.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Confirm your report</h1>
        <p className="page-subtitle">
          Review the information below before sending your report.
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

        <h2 className="section-title">Report summary</h2>

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
          Once submitted, your report will be sent to the moderation system for review.
        </p>

        {error && <div className="error-message">{error}</div>}

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() =>
              navigate("/report/nextsteps", {
                state: {
                  post,
                  reason,
                  affected,
                  pattern,
                  extraDetails,
                },
              })
            }
            disabled={isSubmitting}
          >
            Go back
          </button>

          <button
            className="button-primary"
            onClick={handleConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Confirm report"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationPage;