import { useNavigate } from "react-router-dom";

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="app">
      <h2>Report submitted</h2>
      <p>Thank you. Your report has been received.</p>

      <button onClick={() => navigate("/")}>Done</button>
    </div>
  );
}

export default SuccessPage;