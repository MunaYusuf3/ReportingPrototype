import { useLocation, useNavigate } from "react-router-dom";

function OptionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  if (!post) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">No content selected</h1>
          <p className="page-subtitle">
            Go back to the feed and choose a post or message first.
          </p>
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

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">What would you like to do?</h1>
        <p className="page-subtitle">
          Choose an action for this content. Some options remove or limit future
          contact, while others send a report for review.
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

        <h2 className="section-title">Available actions</h2>

        <div className="option-list">
          {platform === "whatsapp" && (
            <>
              <button className="option-card" type="button">
                <div className="option-title">Block this contact</div>
                <div className="option-description">
                  Stop this person from contacting you.
                </div>
              </button>

              {/* Block and report goes straight to the category selection */}
              <button
                className="option-card"
                type="button"
                onClick={() =>
                  navigate("/report/reason", { state: { post } })
                }
              >
                <div className="option-title">Block and report</div>
                <div className="option-description">
                  Block this contact and submit a report for review.
                </div>
              </button>

              <button className="option-card" type="button">
                <div className="option-title">Leave this chat</div>
                <div className="option-description">
                  Exit the conversation without sending a report.
                </div>
              </button>

              <button className="option-card" type="button">
                <div className="option-title">Mute notifications</div>
                <div className="option-description">
                  Silence alerts from this chat.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() =>
                  navigate("/report/reason", { state: { post } })
                }
              >
                <div className="option-title">Report this message</div>
                <div className="option-description">
                  Report this specific message for review.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() =>
                  navigate("/report/softreport", { state: { post } })
                }
              >
                <div className="option-title">Flag behaviour for review</div>
                <div className="option-description">
                  Raise a concern even if you are not sure it clearly breaks the
                  rules.
                </div>
              </button>
            </>
          )}

          {platform === "instagram" && (
            <>
              <button className="option-card" type="button">
                <div className="option-title">Block this account</div>
                <div className="option-description">
                  Prevent this account from interacting with you.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() =>
                  navigate("/report/reason", { state: { post } })
                }
              >
                <div className="option-title">Report this post</div>
                <div className="option-description">
                  Send this content for review.
                </div>
              </button>

              <button className="option-card" type="button">
                <div className="option-title">Mute this account</div>
                <div className="option-description">
                  Hide future posts and stories from this account.
                </div>
              </button>

              <button className="option-card" type="button">
                <div className="option-title">Hide similar content</div>
                <div className="option-description">
                  Reduce similar content appearing in your feed.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() =>
                  navigate("/report/softreport", { state: { post } })
                }
              >
                <div className="option-title">Flag behaviour for review</div>
                <div className="option-description">
                  Mark this as concerning without making a formal report straight
                  away.
                </div>
              </button>
            </>
          )}
        </div>

        <div className="button-row">
          <button className="button-secondary" onClick={() => navigate("/")}>
            Back to feed
          </button>
        </div>
      </div>
    </div>
  );
}

export default OptionsPage;
