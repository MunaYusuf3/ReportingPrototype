import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

//helps user who are not sure which category best fits the harm they encountered
//they must answer both questions then they will be promted with a category 

function MoreHelpPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  const [targeted, setTargeted] = useState("");
  const [behaviour, setBehaviour] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!post) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">Something went wrong</h1>
          <p className="page-subtitle">Go back and start again.</p>
          <div className="button-row">
            <button className="button-secondary" onClick={() => navigate("/")}>
              Go back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getSuggestedCategory = () => {
    if (behaviour === "threats") return "threats_or_intimidation";
    if (behaviour === "sexual") return "sexual_content";
    if (behaviour === "identity") return "hate_or_discrimination";
    if (behaviour === "impersonation") return "scams_or_impersonation";
    if (behaviour === "false_info") return "misinformation";
    if (behaviour === "insults") return "harassment_or_bullying";
    return "something_else";
  };

  const handleContinue = () => {
    setSubmitted(true);
    if (!targeted || !behaviour) return;
    const suggested = getSuggestedCategory();
    navigate("/report/suggested", { state: { post, suggested } });
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Need help choosing?</h1>
        <p className="page-subtitle">
          Answer these two questions and we'll suggest a category for you.
        </p>

        <h2 className="section-title">Does the content target someone directly?</h2>
        <div className="option-list">
          <button
            type="button"
            className={`option-card ${targeted === "yes" ? "selected" : ""}`}
            onClick={() => setTargeted("yes")}
          >
            <div className="option-title">Yes</div>
          </button>
          <button
            type="button"
            className={`option-card ${targeted === "no" ? "selected" : ""}`}
            onClick={() => setTargeted("no")}
          >
            <div className="option-title">No</div>
          </button>
          <button
            type="button"
            className={`option-card ${targeted === "notsure" ? "selected" : ""}`}
            onClick={() => setTargeted("notsure")}
          >
            <div className="option-title">Not sure</div>
          </button>
        </div>

        <h2 className="section-title">What type of behaviour is it?</h2>
        <div className="option-list">
          <button
            type="button"
            className={`option-card ${behaviour === "insults" ? "selected" : ""}`}
            onClick={() => setBehaviour("insults")}
          >
            <div className="option-title">Insults or harassment</div>
          </button>
          <button
            type="button"
            className={`option-card ${behaviour === "identity" ? "selected" : ""}`}
            onClick={() => setBehaviour("identity")}
          >
            <div className="option-title">Hate or discrimination</div>
          </button>
          <button
            type="button"
            className={`option-card ${behaviour === "threats" ? "selected" : ""}`}
            onClick={() => setBehaviour("threats")}
          >
            <div className="option-title">Threats or intimidation</div>
          </button>
          <button
            type="button"
            className={`option-card ${behaviour === "sexual" ? "selected" : ""}`}
            onClick={() => setBehaviour("sexual")}
          >
            <div className="option-title">Unwanted sexual content</div>
          </button>
          <button
            type="button"
            className={`option-card ${behaviour === "impersonation" ? "selected" : ""}`}
            onClick={() => setBehaviour("impersonation")}
          >
            <div className="option-title">Pretending to be someone else</div>
          </button>
          <button
            type="button"
            className={`option-card ${behaviour === "false_info" ? "selected" : ""}`}
            onClick={() => setBehaviour("false_info")}
          >
            <div className="option-title">Spreading false information</div>
          </button>
        </div>

        <div className="summary-box">
          <p>
            If you think something might be harmful, it is okay to report it even if you are not completely sure.
          </p>
        </div>

        {submitted && (!targeted || !behaviour) && (
          <p>
            Please answer both questions before continuing.
          </p>
        )}

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() => navigate("/report/reason", { state: { post } })}
          >
            Go back
          </button>
          <button
            className="button-primary"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreHelpPage;