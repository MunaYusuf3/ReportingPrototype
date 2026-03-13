import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function MoreInformationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const post = location.state?.post;
  const reason = location.state?.reason;

  const [affected, setAffected] = useState("");
  const [pattern, setPattern] = useState("");
  const [extraDetails, setExtraDetails] = useState("");

  if (!post || !reason) {
    return (
      <div className="app">
        <h2>Missing report details</h2>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

  const formatReason = (value) => {
    const labels = {
      harassment: "Harassment or bullying",
      hate_speech: "Hate or discrimination",
      misinformation: "False or misleading information",
      spam_scam: "Spam or impersonation",
      sexual_content: "Non-consensual or sexual content",
      other: "Other",
    };

    return labels[value] || value;
  };

  const handleSubmit = () => {
    navigate("/report/nextsteps", {
      state: {
        post,
        reason,
        affected,
        pattern,
        extraDetails,
      },
    });
  };

  const handleSkip = () => {
    navigate("/report/nextsteps", {
      state: {
        post,
        reason,
        affected: "",
        pattern: "",
        extraDetails: "",
      },
    });
  };

  return (
    <div className="app">
      <h1>Tell us a little more</h1>
      <p className="subtitle">Step 2 of 4: Additional details</p>

      <div className="details-card">
        <div className="selected-category">
          <p><strong>Category selected:</strong> {formatReason(reason)}</p>
        </div>

        <div className="section-box">
          <p>Who is affected?</p>
        </div>

        <div className="option-group">
          <button
            className={affected === "me" ? "selected" : ""}
            onClick={() => setAffected("me")}
          >
            This targets me
          </button>

          <button
            className={affected === "someone_else" ? "selected" : ""}
            onClick={() => setAffected("someone_else")}
          >
            This targets someone else
          </button>

          <button
            className={affected === "prefer_not_to_say" ? "selected" : ""}
            onClick={() => setAffected("prefer_not_to_say")}
          >
            Prefer not to say
          </button>
        </div>

        <div className="section-box">
          <p>Behaviour pattern</p>
        </div>

        <div className="option-group">
          <button
            className={pattern === "once" ? "selected" : ""}
            onClick={() => setPattern("once")}
          >
            This happened once
          </button>

          <button
            className={pattern === "repeated" ? "selected" : ""}
            onClick={() => setPattern("repeated")}
          >
            This is a repeated behaviour
          </button>
        </div>

        <div className="section-box">
          <p>Additional context</p>
        </div>

        <textarea
          className="details-textarea"
          placeholder="Add more details (optional)"
          value={extraDetails}
          onChange={(e) => setExtraDetails(e.target.value)}
        />

        <div className="details-actions">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleSkip}>Skip</button>
        </div>
      </div>
    </div>
  );
}

export default MoreInformationPage;