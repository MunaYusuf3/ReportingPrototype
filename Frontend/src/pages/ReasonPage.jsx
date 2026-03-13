// import { useLocation, useNavigate } from "react-router-dom";

// function ReasonPage() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const post = location.state?.post;

//   if (!post) {
//     return (
//       <div className="app">
//         <h2>No content selected</h2>
//         <button onClick={() => navigate("/")}>Go back</button>
//       </div>
//     );
//   }

//   const handleReasonClick = (reason) => {
//     navigate("/report/moreinfo", {
//       state: {
//         post,
//         reason,
//       },
//     });
//   };

//   return (
//     <div className="app">
//       <h2>Why are you reporting this?</h2>

//       <div className="content-card">
//         <p><strong>Platform:</strong> {post.reported_account?.platform}</p>
//         <p><strong>User:</strong> {post.reported_account?.username}</p>
//         <p><strong>Content:</strong> {post.text}</p>
//       </div>

//       <div className="reason-buttons">
//         <button onClick={() => handleReasonClick("harassment")}>
//           Harassment or bullying
//         </button>

//         <button onClick={() => handleReasonClick("hate_speech")}>
//           Hate or discrimination
//         </button>

//         <button onClick={() => handleReasonClick("misinformation")}>
//           False or misleading information
//         </button>

//         <button onClick={() => handleReasonClick("spam_scam")}>
//           Spam or impersonation
//         </button>

//         <button onClick={() => handleReasonClick("sexual_content")}>
//           Non-consensual or sexual content
//         </button>

//         <button onClick={() => handleReasonClick("other")}>
//           Other
//         </button>
//       </div>

//       <button
//         className="cancel-button"
//         onClick={() => navigate("/report/options", { state: { post } })}
//       >
//         Go back
//       </button>
//     </div>
//   );
// }

// export default ReasonPage;


import { useLocation, useNavigate } from "react-router-dom";

function ReasonPage() {
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

  const platform = post.reported_account?.platform?.toLowerCase();

  const handleReasonClick = (reason) => {
    navigate("/report/moreinfo", {
      state: {
        post,
        reason,
      },
    });
  };

  return (
    <div className="app">
      <h2>Why are you reporting this?</h2>

      <div className="content-card">
        <p><strong>Platform:</strong> {post.reported_account?.platform}</p>
        <p><strong>User:</strong> {post.reported_account?.username}</p>
        <p><strong>Content:</strong> {post.text}</p>
      </div>

      <div className="reason-buttons">
        {platform === "whatsapp" && (
          <>
            <button onClick={() => handleReasonClick("harassment_or_bullying")}>
              Harassment or bullying:
              Insults, repeated harassment, or targeting someone personally
            </button>

            <button onClick={() => handleReasonClick("hate_or_discrimination")}>
              Hate or discrimination:
              Content attacking someone because of their identity
            </button>

            <button onClick={() => handleReasonClick("threats_or_intimidation")}>
              Threats or intimidation:
              Statements suggesting violence or serious harm
            </button>

            <button onClick={() => handleReasonClick("sexual_content")}>
              Sexual abuse or exploitation:
              Unwanted secual behaviour or exploitation
            </button>

            <button onClick={() => handleReasonClick("scams_or_impersonation")}>
              Scams or impersonation:
              Messages pretending to be someone else or trying to trick you into sending money or personal information
            </button>

            <button onClick={() => handleReasonClick("something_else")}>
              Not sure which category fits?
            </button>
          </>
        )}

        {platform === "instagram" && (
          <>
          <button onClick={() => handleReasonClick("harassment_or_bullying")}>
            Harassment or bullying:
            Insults, repeated harassment, or targeting someone personally
          </button>

          <button onClick={() => handleReasonClick("hate_or_discrimination")}>
            Hate or discrimination:
            Content attacking someone because of their identity
          </button>

          <button onClick={() => handleReasonClick("threats_or_intimidation")}>
            Threats or intimidation:
            Statements suggesting violence or serious harm
          </button>

          <button onClick={() => handleReasonClick("sexual_content")}>
            Sexual abuse or exploitation:
            Unwanted secual behaviour or exploitation
          </button>

          <button onClick={() => handleReasonClick("misinformation")}>
            False or misleading information:
            Content designed to decieve or mislead
          </button>

          <button onClick={() => handleReasonClick("something_else")}>
            Not sure which category fits?
          </button>
          
        </>
        )}
      </div>

      <button
        className="cancel-button"
        onClick={() => navigate("/report/options", { state: { post } })}
      >
        Go back
      </button>
    </div>
  );
}

export default ReasonPage;