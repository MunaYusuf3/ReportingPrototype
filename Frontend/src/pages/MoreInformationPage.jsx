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
      <div className="page">
        <div className="card">
          <h1 className="page-title">Missing report details</h1>
          <p className="page-subtitle">
            Go back and choose the content and report category first.
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

  const handleContinue = () => {
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
    <div className="page">
      <div className="card">
        <h1 className="page-title">Tell us a little more</h1>
        <p className="page-subtitle">
          This extra context can help make the report easier to review.
        </p>

        <div className="summary-box">
          <div className="summary-item">
            <strong>Platform:</strong> {post.reported_account?.platform}
          </div>
          <div className="summary-item">
            <strong>User:</strong> {post.reported_account?.username}
          </div>
          <div className="summary-item">
            <strong>Category selected:</strong> {formatReason(reason)}
          </div>
          <div className="summary-item">
            <strong>Content:</strong> {post.text}
          </div>
        </div>

        <h2 className="section-title">Who is affected?</h2>
        <div className="option-list">
          <button
            type="button"
            className={`option-card ${affected === "me" ? "selected" : ""}`}
            onClick={() => setAffected("me")}
          >
            <div className="option-title">This targets me</div>
            <div className="option-description">
              The content is directed at me or affects me personally.
            </div>
          </button>

          <button
            type="button"
            className={`option-card ${
              affected === "someone_else" ? "selected" : ""
            }`}
            onClick={() => setAffected("someone_else")}
          >
            <div className="option-title">This targets someone else</div>
            <div className="option-description">
              The content affects another person or group.
            </div>
          </button>

          <button
            type="button"
            className={`option-card ${
              affected === "prefer_not_to_say" ? "selected" : ""
            }`}
            onClick={() => setAffected("prefer_not_to_say")}
          >
            <div className="option-title">Prefer not to say</div>
            <div className="option-description">
              Continue without sharing who is affected.
            </div>
          </button>
        </div>

        <h2 className="section-title">Behaviour pattern</h2>
        <div className="option-list">
          <button
            type="button"
            className={`option-card ${pattern === "once" ? "selected" : ""}`}
            onClick={() => setPattern("once")}
          >
            <div className="option-title">This happened once</div>
            <div className="option-description">
              This appears to be a one-off incident.
            </div>
          </button>

          <button
            type="button"
            className={`option-card ${
              pattern === "repeated" ? "selected" : ""
            }`}
            onClick={() => setPattern("repeated")}
          >
            <div className="option-title">This is repeated behaviour</div>
            <div className="option-description">
              Similar behaviour has happened before or keeps happening.
            </div>
          </button>
        </div>

        <h2 className="section-title">Additional context</h2>
        <label htmlFor="extraDetails">Anything else you want us to know?</label>
        <textarea
          id="extraDetails"
          placeholder="Add more details if you want to. This is optional."
          value={extraDetails}
          onChange={(e) => setExtraDetails(e.target.value)}
        />

        <p className="helper-text">
          You can continue without answering every question.
        </p>

        <div className="button-row">
          <button className="button-secondary" onClick={handleSkip}>
            Skip
          </button>
          <button className="button-primary" onClick={handleContinue}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreInformationPage;