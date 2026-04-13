import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./styling/OptionsPage.css";

//shows what actions are available depending on the platform
function OptionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;
  const [showPrivacy, setShowPrivacy] = useState(false);

  if (!post) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">No content selected</h1>
          <p className="page-subtitle">
            please choose a post or message first from the feed
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

        {showPrivacy && (
          <div className="modal-overlay">
            <div className="modal-box">
              <h2>What happens when you report</h2>
              <p>Before you report here's what WhatsApp can and can't see:</p>

              <div className="modal-options">
                <div className="option-card">
                  <div className="option-title">Only the reported messages are seen</div>
                  <div className="option-description">
                    The specific messages you report may be reviewed by WhatsApp's moderation team.
                  </div>
                </div>
                <div className="option-card">
                  <div className="option-title">The person won't know it was you</div>
                  <div className="option-description">
                    The person you report will not be told that you reported them.
                  </div>
                </div>
                <div className="option-card">
                  <div className="option-title">Your other chats aren't affected</div>
                  <div className="option-description">
                    Only the reported messages are shared. The rest of your conversations are not affected.
                  </div>
                </div>
              </div>

              <button
                className="button-primary modal-confirm-button"
                onClick={() => setShowPrivacy(false)}
              >
                Got it
              </button>
            </div>
          </div>
        )}

        <h1 className="page-title">What would you like to do?</h1>

        {/* specific to Whatsapp, explains what gets shared when you report */}
        {platform === "whatsapp" && (
          <button
            type="button"
            className="privacy-link"
            onClick={() => setShowPrivacy(true)}
          >
            What information is shared when you report?
          </button>
        )}

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

        <p className="helper-text privacy-notice">
          Your identity will not be shared with the reported user.
        </p>

        <h2 className="section-title">Your options</h2>

        <div className="option-list">
          {platform === "whatsapp" && (
            <>
              <button className="option-card" type="button">
                <div className="option-title">Block this contact</div>
                <div className="option-description">
                  Stop this person from contacting you.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => navigate("/report/reason", { state: { post } })}
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
                onClick={() => navigate("/report/reason", { state: { post } })}
              >
                <div className="option-title">Report this message</div>
                <div className="option-description">
                  Report this specific message for review.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => navigate("/report/softreport", { state: { post } })}
              >
                <div className="option-title">Flag behaviour for review</div>
                <div className="option-description">
                  Raise a concern even if you are not sure it clearly breaks the rules.
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
                onClick={() => navigate("/report/reason", { state: { post } })}
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
                onClick={() => navigate("/report/softreport", { state: { post } })}
              >
                <div className="option-title">Flag behaviour for review</div>
                <div className="option-description">
                  Mark this as concerning without making a formal report straight away.
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