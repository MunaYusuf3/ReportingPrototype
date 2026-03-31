import { useNavigate } from "react-router-dom";

function MoreHelpPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Need help choosing?</h1>
        <p className="page-subtitle">
          This page is not built yet. Come back to this
        </p>
        <div className="button-row">
          <button className="button-secondary" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default MoreHelpPage;
