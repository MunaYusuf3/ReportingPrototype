import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "../components/ProgressBar";
import "./styling/ReasonPage.css";

function ReasonPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const post = location.state?.post;
  const [infoOpen, setInfoOpen] = useState(null);

  if (!post) {
    return (
      <div className="page">
        <div className="card">
          <h1 className="page-title">No content selected</h1>
          <p className="page-subtitle">Go back and choose a post or message first.</p>
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
        <ProgressBar current={1} total={5} />
        <h1 className="page-title">Why are you reporting this?</h1>
        <p className="page-subtitle">
          Pick the option that best matches what happened.<br/>
          Take your time, there is no wrong answer here.
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

        <h2 className="section-title">What best describes what happened?</h2>

        <p className="helper-text" style={{ marginBottom: "12px" }}>
          If something felt wrong, it's worth reporting. Leave the rest to us.
        </p>

        <div className="option-list">
          {platform === "instagram" && (
            <>
              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "harassment_or_bullying" } })}>
                <div className="category-header">
                  <div className="option-title">Harassment or bullying</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "harassment_or_bullying" ? null : "harassment_or_bullying"); }}>ℹ</span>
                </div>
                <div className="option-description">Insults, repeated harassment, or content targeting someone personally.</div>
                {infoOpen === "harassment_or_bullying" && (
                  <div className="category-example">e.g. someone repeatedly sending hostile messages, name calling, or targeting you</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "hate_or_discrimination" } })}>
                <div className="category-header">
                  <div className="option-title">Hate or discrimination</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "hate_or_discrimination" ? null : "hate_or_discrimination"); }}>ℹ</span>
                </div>
                <div className="option-description">Content attacking someone because of their identity.</div>
                {infoOpen === "hate_or_discrimination" && (
                  <div className="category-example">e.g. posts targeting someone because of their race, religion, gender or sexuality</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "threats_or_intimidation" } })}>
                <div className="category-header">
                  <div className="option-title">Threats or intimidation</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "threats_or_intimidation" ? null : "threats_or_intimidation"); }}>ℹ</span>
                </div>
                <div className="option-description">Statements suggesting violence or serious harm.</div>
                {infoOpen === "threats_or_intimidation" && (
                  <div className="category-example">e.g. messages saying they will hurt you, threats to share personal information, or intimidating language</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "sexual_content" } })}>
                <div className="category-header">
                  <div className="option-title">Sexual abuse or exploitation</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "sexual_content" ? null : "sexual_content"); }}>ℹ</span>
                </div>
                <div className="option-description">Unwanted sexual behaviour, coercion, or exploitative content.</div>
                {infoOpen === "sexual_content" && (
                  <div className="category-example">e.g. unsolicited sexual messages, sharing intimate images without consent, or grooming behaviour</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "misinformation" } })}>
                <div className="category-header">
                  <div className="option-title">False or misleading information</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "misinformation" ? null : "misinformation"); }}>ℹ</span>
                </div>
                <div className="option-description">Content designed to deceive or spread false claims.</div>
                {infoOpen === "misinformation" && (
                  <div className="category-example">e.g. fake news stories, health misinformation, or posts designed to mislead people</div>
                )}
              </button>
            </>
          )}

          {platform === "whatsapp" && (
            <>
              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "harassment_or_bullying" } })}>
                <div className="category-header">
                  <div className="option-title">Harassment or bullying</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "harassment_or_bullying" ? null : "harassment_or_bullying"); }}>ℹ</span>
                </div>
                <div className="option-description">Insults, repeated harassment, or content targeting someone personally.</div>
                {infoOpen === "harassment_or_bullying" && (
                  <div className="category-example">e.g. someone repeatedly sending hostile messages, name calling, or targeting you personally</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "hate_or_discrimination" } })}>
                <div className="category-header">
                  <div className="option-title">Hate or discrimination</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "hate_or_discrimination" ? null : "hate_or_discrimination"); }}>ℹ</span>
                </div>
                <div className="option-description">Content attacking someone because of their identity.</div>
                {infoOpen === "hate_or_discrimination" && (
                  <div className="category-example">e.g. messages targeting someone because of their race, religion, gender or sexuality</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "threats_or_intimidation" } })}>
                <div className="category-header">
                  <div className="option-title">Threats or intimidation</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "threats_or_intimidation" ? null : "threats_or_intimidation"); }}>ℹ</span>
                </div>
                <div className="option-description">Statements suggesting violence or serious harm.</div>
                {infoOpen === "threats_or_intimidation" && (
                  <div className="category-example">e.g. messages saying they will hurt you or threatening to expose personal information</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "sexual_content" } })}>
                <div className="category-header">
                  <div className="option-title">Sexual abuse or exploitation</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "sexual_content" ? null : "sexual_content"); }}>ℹ</span>
                </div>
                <div className="option-description">Unwanted sexual behaviour, coercion, or exploitative content.</div>
                {infoOpen === "sexual_content" && (
                  <div className="category-example">e.g. unsolicited sexual messages or pressure to share intimate images</div>
                )}
              </button>

              <button className="option-card" type="button" onClick={() => navigate("/report/moreinfo", { state: { post, reason: "scams_or_impersonation" } })}>
                <div className="category-header">
                  <div className="option-title">Scams or impersonation</div>
                  <span className="info-button" onClick={(e) => { e.stopPropagation(); setInfoOpen(infoOpen === "scams_or_impersonation" ? null : "scams_or_impersonation"); }}>ℹ</span>
                </div>
                <div className="option-description">Messages pretending to be someone else or trying to trick you.</div>
                {infoOpen === "scams_or_impersonation" && (
                  <div className="category-example">e.g. someone pretending to be a friend or company to get your money or personal details</div>
                )}
              </button>
            </>
          )}

          <button
            className="option-card"
            type="button"
            onClick={() => navigate("/report/morehelp", { state: { post } })}
          >
            <div className="option-title">Not sure which category fits?</div>
            <div className="option-description">
              Answer a couple of quick questions and we'll point you in the right direction.
            </div>
          </button>
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