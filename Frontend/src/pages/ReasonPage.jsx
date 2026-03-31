import { useLocation, useNavigate } from "react-router-dom";

const INSTAGRAM_CATEGORIES = [
  {
    value: "harassment_or_bullying",
    title: "Harassment or bullying",
    description: "Insults, repeated harassment, or content targeting someone personally.",
  },
  {
    value: "hate_or_discrimination",
    title: "Hate or discrimination",
    description: "Content attacking someone because of their identity.",
  },
  {
    value: "threats_or_intimidation",
    title: "Threats or intimidation",
    description: "Statements suggesting violence or serious harm.",
  },
  {
    value: "sexual_content",
    title: "Sexual abuse or exploitation",
    description: "Unwanted sexual behaviour, coercion, or exploitative content.",
  },
  {
    value: "misinformation",
    title: "False or misleading information",
    description: "Content designed to deceive, mislead, or spread false claims.",
  },
  {
    value: "something_else",
    title: "Not sure which category fits?",
    description: "Continue anyway and explain the issue in your own words.",
  },
];

const WHATSAPP_CATEGORIES = [
  {
    value: "harassment_or_bullying",
    title: "Harassment or bullying",
    description: "Insults, repeated harassment, or content targeting someone personally.",
  },
  {
    value: "hate_or_discrimination",
    title: "Hate or discrimination",
    description: "Content attacking someone because of their identity.",
  },
  {
    value: "threats_or_intimidation",
    title: "Threats or intimidation",
    description: "Statements suggesting violence or serious harm.",
  },
  {
    value: "sexual_content",
    title: "Sexual abuse or exploitation",
    description: "Unwanted sexual behaviour, coercion, or exploitative content.",
  },
  {
    value: "scams_or_impersonation",
    title: "Scams or impersonation",
    description:
      "Messages pretending to be someone else or trying to trick people into sharing money or personal information.",
  },
  {
    value: "something_else",
    title: "Not sure which category fits?",
    description: "Continue anyway and explain the issue in your own words.",
  },
];

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
  const categories =
    platform === "instagram" ? INSTAGRAM_CATEGORIES : WHATSAPP_CATEGORIES;

  const handleReasonClick = (reason) => {
    navigate("/report/moreinfo", { state: { post, reason } });
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Why are you reporting this?</h1>
        <p className="page-subtitle">
          Choose the option that best matches what happened. You can add more
          detail on the next screen.
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
          {categories.map((cat) => (
            <button
              key={cat.value}
              className="option-card"
              type="button"
              onClick={() => handleReasonClick(cat.value)}
            >
              <div className="option-title">{cat.title}</div>
              <div className="option-description">{cat.description}</div>
            </button>
          ))}
        </div>

        <div className="button-row">
          <button
            className="button-secondary"
            onClick={() =>
              navigate("/report/options", { state: { post } })
            }
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReasonPage;
