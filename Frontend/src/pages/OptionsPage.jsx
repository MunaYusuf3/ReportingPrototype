import { useLocation, useNavigate } from "react-router-dom";

function OptionsPage() {
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

  const platform = post.reported_account?.platform;

  const goToReportReasons = () => {
    navigate("/report/reason", {
      state: { post },
    });
  };

  const goToSoftReport = () => {
    navigate("/report/softreport", {
      state: { post },
    });
  };

  return (
    <div className="app">
      <h2>What would you like to do?</h2>

      <div className="content-card">
        <p><strong>Platform:</strong> {platform}</p>
        <p><strong>User:</strong> {post.reported_account?.username}</p>
        <p><strong>Content:</strong> {post.text}</p>
      </div>

      <div className="reason-buttons">
        {platform === "whatsapp" && (
          <>
            <button>Block this contact</button>
            <button onClick={goToReportReasons}>Block and report</button>
            <button>Leave this chat</button>
            <button>Mute notifications</button>
            <button onClick={goToReportReasons}>Report this message</button>
            <button onClick={goToSoftReport}>Flag behaviour for review</button>
          </>
        )}

        {platform === "instagram" && (
          <>
            <button>Block this account</button>
            <button onClick={goToReportReasons}>Report this post</button>
            <button>Mute this account</button>
            <button>Hide similar content</button>
            <button onClick={goToSoftReport}>Flag behaviour for review</button>
            
          </>
        )}
      </div>

      <button className="cancel-button" onClick={() => navigate("/")}>
        Go back
      </button>
    </div>
  );
}

export default OptionsPage;