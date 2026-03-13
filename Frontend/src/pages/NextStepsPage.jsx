//add to back end that when it goes to this page , an extra report is added to the perpetrators account

import { useLocation, useNavigate } from "react-router-dom";

function NextStepsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  if (!post) {
    return (
      <div className="app">
        <h2>No content selected</h2>
        <button onClick={() => navigate("/")}>Go back</button>
      </div>
    );
  }

 
  return (
    <div className="app">
      <h2>Next Steps page</h2>

      <button
        className="cancel-button"
        onClick={() => navigate("/report/confirmation", { state: { post } })}
      >
        Confirmation page
      </button>
    </div>
  );
}

export default NextStepsPage;