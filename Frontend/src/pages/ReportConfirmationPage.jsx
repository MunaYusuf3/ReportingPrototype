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
      <div className="app">
        <h2>Missing report information</h2>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

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
    <div className="app">
      <h2>Confirm your report</h2>

      <div className="content-card">
        <p><strong>Platform:</strong> {post.reported_account?.platform}</p>
        <p><strong>User:</strong> {post.reported_account?.username}</p>
        <p><strong>Content:</strong> {post.text}</p>
        <p><strong>Category:</strong> {reason}</p>
      </div>

      {error && <p>{error}</p>}

      <button onClick={handleConfirm} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Confirm report"}
      </button>
    </div>
  );
}

export default ConfirmationPage;