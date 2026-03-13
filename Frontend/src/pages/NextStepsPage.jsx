import { useLocation, useNavigate } from "react-router-dom";

function NextStepsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const post = location.state?.post;
  const reason = location.state?.reason;
  const affected = location.state?.affected;
  const pattern = location.state?.pattern;
  const extraDetails = location.state?.extraDetails;

  if (!post || !reason) {
    return (
      <div className="app">
        <h2>No content selected</h2>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

  return (
    <div className="app">
      <h2>What happens next?</h2>
      <p>Your report will be reviewed by the moderation system.</p>

      <button
        className="cancel-button"
        onClick={() =>
          navigate("/report/confirmation", {
            state: {
              post,
              reason,
              affected,
              pattern,
              extraDetails,
            },
          })
        }
      >
        Continue
      </button>
    </div>
  );
}

export default NextStepsPage;