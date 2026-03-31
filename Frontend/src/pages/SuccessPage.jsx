import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Report submitted</h1>
        <p className="page-subtitle">
          Your report has been received. Thank you for helping keep the
          community safe.
        </p>

        <div className="success-message">
          ✓ Your report was sent successfully.
        </div>

        <h2 className="section-title">What happens now</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">Your report will be reviewed</div>
            <div className="option-description">
              Moderators will use the information you provided to assess the
              situation and decide whether action is needed.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Reviews can take time</div>
            <div className="option-description">
              Some reports take longer to review, especially when more context
              is needed. We aim to review within 24–48 hours.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">You can still protect yourself</div>
            <div className="option-description">
              You may also want to block, mute, or limit contact while your
              report is being reviewed.
            </div>
          </div>
        </div>

        <div className="button-row">
          <button className="button-primary" onClick={() => navigate("/")}>
            Back to feed
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessPage;
