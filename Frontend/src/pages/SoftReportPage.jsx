// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { apiUrl } from "../utils";
// import ProgressBar from "../components/ProgressBar";

// function SoftReportPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const post = location.state?.post;

//   const [extraInfo, setExtraInfo] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   if (!post) {
//     return (
//       <div className="page">
//         <div className="card">
//           <h1 className="page-title">Something went wrong</h1>
//           <p className="page-subtitle">Go back and start again.</p>
//           <div className="button-row">
//             <button className="button-secondary" onClick={() => navigate("/")}>
//               Go back
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");

//     const payload = {
//       platform: post.reported_account?.platform,
//       username: post.reported_account?.username,
//       content_id: post.content_id,
//       content_type: post.content_type,
//       text: post.text,
//       category: "soft_report",
//       description: extraInfo.trim() ? extraInfo : "flagged without a formal category",
//       reporter_id: "",
//     };

//     try {
//       const response = await fetch(`${apiUrl}/api/reports/submit/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.error || "Failed to submit");

//       navigate("/report/success");
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="page">
//       <div className="card">
//         <ProgressBar current={1} total={2} />
//         <h1 className="page-title">Flag behaviour for review</h1>
//         <p className="page-subtitle">
//           Use this if something feels wrong but you are not sure it fits a
//           specific category. You do not need to be certain.
//         </p>

//         <div className="summary-box">
//           <div className="summary-item">
//             <strong>Platform:</strong> {post.reported_account?.platform}
//           </div>
//           <div className="summary-item">
//             <strong>User:</strong> {post.reported_account?.username}
//           </div>
//           <div className="summary-item">
//             <strong>Content:</strong> {post.text}
//           </div>
//         </div>

//         <h2 className="section-title">What happens when you flag</h2>

//         <div className="option-list">
//           <div className="option-card">
//             <div className="option-title">The person won't be notified</div>
//             <div className="option-description">
//               Flags are anonymous. Multiple flags from different users help
//               moderators identify patterns.
//             </div>
//           </div>

//           <div className="option-card">
//             <div className="option-title">No category needed</div>
//             <div className="option-description">
//               You don't need to pick a specific category or be sure something
//               went wrong to raise a concern.
//             </div>
//           </div>

//           <div className="option-card">
//             <div className="option-title">Builds up over time</div>
//             <div className="option-description">
//               Flags help spot behaviour that might become more serious across
//               different interactions.
//             </div>
//           </div>
//         </div>

//         <h2 className="section-title">Add a note (optional)</h2>
//         <textarea
//           placeholder="Describe what felt concerning, or leave this blank."
//           value={extraInfo}
//           onChange={(e) => setExtraInfo(e.target.value)}
//         />

//         {error && <div className="error-message">{error}</div>}

//         <div className="button-row">
//           <button
//             className="button-secondary"
//             onClick={() => navigate(-1)}
//             disabled={loading}
//           >
//             Go back
//           </button>
//           <button
//             className="button-primary"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? "Submitting..." : "Submit flag"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SoftReportPage;


import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiUrl } from "../utils";
import ProgressBar from "../components/ProgressBar";

function SoftReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  const [extraInfo, setExtraInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const platform = post.reported_account?.platform?.toLowerCase();

  const submitFlag = async () => {
    setLoading(true);
    setError("");

    const reportData = {
      platform: post.reported_account?.platform,
      username: post.reported_account?.username,
      content_id: post.content_id,
      content_type: post.content_type,
      text: post.text,
      category: "soft_report",
      description: extraInfo.trim() ? extraInfo : "flagged without a formal category",
      reporter_id: "",
    };

    try {
      const response = await fetch(`${apiUrl}/api/reports/submit/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit");

      navigate("/report/success", { state: { isSoftReport: true } });
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card">
        <ProgressBar current={1} total={2} />
        <h1 className="page-title">Flag behaviour for review</h1>
        <p className="page-subtitle">
          Use this if something feels wrong but you are not sure it fits a
          specific category. It's okay if you're not certain, flagging
          something you're uncomfortable with is always valid.
        </p>

        <div className="summary-box">
          <div className="summary-item">
            <strong>Platform:</strong> {post.reported_account?.platform}
          </div>
          <div className="summary-item">
            <strong>User:</strong> {post.reported_account?.username}
          </div>
          <div className="summary-item">
            <strong>Content:</strong> {post.text}
          </div>
        </div>

        {platform === "whatsapp" && (
          <p className="helper-text" style={{ marginTop: "12px" }}>
            Flagging someone you know can feel difficult. Your identity will
            not be shared with them.
          </p>
        )}

        <h2 className="section-title">What happens when you flag</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">The person won't be notified</div>
            <div className="option-description">
              Flags are anonymous. Multiple flags from different users help
              moderators identify patterns.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">No category needed</div>
            <div className="option-description">
              You don't need to pick a specific category or be sure something
              went wrong to raise a concern.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Builds up over time</div>
            <div className="option-description">
              Flags help spot behaviour that might become more serious across
              different interactions.
            </div>
          </div>
        </div>

        <h2 className="section-title">Add a note (optional)</h2>
        <textarea
          placeholder="Describe what felt concerning, or leave this blank."
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />

        <p className="helper-text" style={{ marginTop: "8px" }}>
          Once submitted, your flag will be logged for review. No further
          action is needed from you.
        </p>

        {error && <div className="error-message">{error}</div>}

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Go back
          </button>
          <button
            className="button-primary"
            onClick={submitFlag}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit flag"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SoftReportPage;