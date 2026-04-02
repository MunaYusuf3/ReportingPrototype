import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { reasons } from "../utils";
import ProgressBar from "../components/ProgressBar";

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

  const handleContinue = () => {
    navigate("/report/nextsteps", {
      state: { post, reason, affected, pattern, extraDetails },
    });
  };

  const handleSkip = () => {
    navigate("/report/nextsteps", {
      state: { post, reason, affected: "", pattern: "", extraDetails: "" },
    });
  };

  return (
    <div className="page">
      <div className="card">
      <ProgressBar current={2} total={5} />
        <h1 className="page-title">A little more detail</h1>
        <p className="page-subtitle">
          These are optional, only answer what feels relevent<br/>
          You don't have to share anything you're comfortable with.
        </p>

        <div className="summary-box">
          <div className="summary-item">
            <strong>Platform:</strong> {post.reported_account?.platform}
          </div>
          <div className="summary-item">
            <strong>User:</strong> {post.reported_account?.username}
          </div>
          <div className="summary-item">
            <strong>Category:</strong> {reasons(reason)}
          </div>
        </div>

        <h2 className="section-title">Who is affected?</h2>
        <div className="option-list">
          <button
            type="button"
            className={`option-card ${affected === "me" ? "selected" : ""}`}
            onClick={() => setAffected(affected === "me" ? "" : "me")}
          >
            <div className="option-title">This targets me</div>
          </button>

          <button
            type="button"
            className={`option-card ${affected === "someone_else" ? "selected" : ""}`}
            onClick={() => setAffected(affected === "someone_else" ? "" : "someone_else")}
          >
            <div className="option-title">This targets someone else</div>
            <div className="option-description"> e.g you witnessed this happening to another person</div>
          </button>

          <button
            type="button"
            className={`option-card ${affected === "prefer_not_to_say" ? "selected" : ""}`}
            onClick={() => setAffected(affected === "prefer_not_to_say" ? "" : "prefer_not_to_say")}
          >
            <div className="option-title">Prefer not to say</div>
          </button>
        </div>

        <h2 className="section-title">Has this happened before?</h2>
        <div className="option-list">
          <button
            type="button"
            className={`option-card ${pattern === "once" ? "selected" : ""}`}
            onClick={() => setPattern(pattern === "once" ? "" : "once")}
          >
            <div className="option-title">Just this once</div>
          </button>

          <button
            type="button"
            className={`option-card ${pattern === "repeated" ? "selected" : ""}`}
            onClick={() => setPattern(pattern === "repeated" ? "" : "repeated")}
          >
            <div className="option-title">This keeps happening</div>
          </button>
        </div>

        <h2 className="section-title">Anything else to add?</h2>
        <textarea
          placeholder="Optional - add any extra context here"
          value={extraDetails}
          onChange={(e) => setExtraDetails(e.target.value)}
        />

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