import { useLocation, useNavigate } from "react-router-dom";

function ReasonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;

  if (!post) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">No content selected</h1>
          <p className="page-subtitle">
            Go back and choose a post or message first.
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

  const handleReasonClick = (reason) => {
    navigate("/report/moreinfo", {
      state: {
        post,
        reason,
      },
    });
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Why are you reporting this?</h1>
        <p className="page-subtitle">
          Choose the option that best matches what happened. You can still add
          more detail on the next screen.
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

        <h2 className="section-title">Report category</h2>

        <div className="option-list">
          {platform === "whatsapp" && (
            <>
              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("harassment_or_bullying")}
              >
                <div className="option-title">Harassment or bullying</div>
                <div className="option-description">
                  Insults, repeated harassment, or content targeting someone
                  personally.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("hate_or_discrimination")}
              >
                <div className="option-title">Hate or discrimination</div>
                <div className="option-description">
                  Content attacking someone because of their identity.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("threats_or_intimidation")}
              >
                <div className="option-title">Threats or intimidation</div>
                <div className="option-description">
                  Statements suggesting violence or serious harm.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("sexual_content")}
              >
                <div className="option-title">
                  Sexual abuse or exploitation
                </div>
                <div className="option-description">
                  Unwanted sexual behaviour, coercion, or exploitative content.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("scams_or_impersonation")}
              >
                <div className="option-title">Scams or impersonation</div>
                <div className="option-description">
                  Messages pretending to be someone else or trying to trick
                  people into sharing money or personal information.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("something_else")}
              >
                <div className="option-title">Not sure which category fits?</div>
                <div className="option-description">
                  Continue anyway and explain the issue in your own words.
                </div>
              </button>
            </>
          )}

          {platform === "instagram" && (
            <>
              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("harassment_or_bullying")}
              >
                <div className="option-title">Harassment or bullying</div>
                <div className="option-description">
                  Insults, repeated harassment, or content targeting someone
                  personally.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("hate_or_discrimination")}
              >
                <div className="option-title">Hate or discrimination</div>
                <div className="option-description">
                  Content attacking someone because of their identity.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("threats_or_intimidation")}
              >
                <div className="option-title">Threats or intimidation</div>
                <div className="option-description">
                  Statements suggesting violence or serious harm.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("sexual_content")}
              >
                <div className="option-title">
                  Sexual abuse or exploitation
                </div>
                <div className="option-description">
                  Unwanted sexual behaviour, coercion, or exploitative content.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("misinformation")}
              >
                <div className="option-title">
                  False or misleading information
                </div>
                <div className="option-description">
                  Content designed to deceive, mislead, or spread false claims.
                </div>
              </button>

              <button
                className="option-card"
                type="button"
                onClick={() => handleReasonClick("something_else")}
              >
                <div className="option-title">Not sure which category fits?</div>
                <div className="option-description">
                  Continue anyway and explain the issue in your own words.
                </div>
              </button>
            </>
          )}
        </div>

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() => navigate("/report/options", { state: { post } })}
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReasonPage;