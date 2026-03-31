import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { formatReason } from "../utils";

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
            Go back and choose the content and category first.
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
  const goToNextSteps = (options = {}) => {
    navigate("/report/nextsteps", {
      state: {
        post,
        reason,
        affected: options.skip ? "" : affected,
        pattern: options.skip ? "" : pattern,
        extraDetails: options.skip ? "" : extraDetails,
      },
    });
  };

  const WHO_OPTIONS = [
    {
      value: "me",
      title: "This targets me",
      description: "The content is directed at me or affects me personally.",
    },
    {
      value: "someone_else",
      title: "This targets someone else",
      description: "The content affects another person or group.",
    },
    {
      value: "prefer_not_to_say",
      title: "Prefer not to say",
      description: "Continue without sharing who is affected.",
    },
  ];

  const PATTERN_OPTIONS = [
    {
      value: "once",
      title: "This happened once",
      description: "This appears to be a one-off incident.",
    },
    {
      value: "repeated",
      title: "This is repeated behaviour",
      description: "Similar behaviour has happened before or keeps happening.",
    },
  ];

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Tell us a little more</h1>
        <p className="page-subtitle">
          This extra context helps make the report easier to review. Everything
          here is optional — you can skip if you prefer.
        </p>

        <div className="summary-box">
          <div className="summary-item">
            <strong>Platform:</strong> {post.reported_account?.platform}
          </div>
          <div className="summary-item">
            <strong>User:</strong> {post.reported_account?.username}
          </div>
          <div className="summary-item">
            <strong>Category:</strong> {formatReason(reason)}
          </div>
        </div>

        <h2 className="section-title">Who is affected?</h2>
        <div className="option-list">
          {WHO_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`option-card ${affected === opt.value ? "selected" : ""}`}
              onClick={() =>
                // Clicking the selected option again deselects it
                setAffected(affected === opt.value ? "" : opt.value)
              }
            >
              <div className="option-title">{opt.title}</div>
              <div className="option-description">{opt.description}</div>
            </button>
          ))}
        </div>

        <h2 className="section-title">Behaviour pattern</h2>
        <div className="option-list">
          {PATTERN_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              className={`option-card ${pattern === opt.value ? "selected" : ""}`}
              onClick={() =>
                setPattern(pattern === opt.value ? "" : opt.value)
              }
            >
              <div className="option-title">{opt.title}</div>
              <div className="option-description">{opt.description}</div>
            </button>
          ))}
        </div>

        <h2 className="section-title">Anything else?</h2>
        <label htmlFor="extraDetails">Additional context (optional)</label>
        <textarea
          id="extraDetails"
          placeholder="Add more detail if you want to. This is completely optional."
          value={extraDetails}
          onChange={(e) => setExtraDetails(e.target.value)}
        />

        <p className="helper-text">
          You can continue without answering any of the questions above.
        </p>

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() => goToNextSteps({ skip: true })}
          >
            Skip
          </button>
          <button
            className="button-primary"
            onClick={() => goToNextSteps()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreInformationPage;
