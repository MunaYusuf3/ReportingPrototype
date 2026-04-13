import { useNavigate } from "react-router-dom";

function SupportPage() {
  const navigate = useNavigate();

  //links to external support

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Support and resources</h1>
        <p className="page-subtitle">
          Reporting something that has affected you can be draining. You don't
          have to deal with this on your own.
        </p>

        <h2 className="section-title">If you have experienced online harm</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">Cybersmile Foundation</div>
            <div className="option-description">
              Support for people experiencing cyberbullying, online abuse and
              digital harassment.
            </div>
            <a href="https://www.cybersmile.org" target="_blank" rel="noreferrer" className="resource-link">
              Visit Cybersmile →
            </a>
          </div>

          <div className="option-card">
            <div className="option-title">Report Harmful Content</div>
            <div className="option-description">
              A UK service that helps you report harmful content online and
              understand your options.
            </div>
            <a href="https://reportharmfulcontent.com"target="_blank" rel="noreferrer" className="resource-link">
              Visit Report Harmful Content →
            </a>
          </div>
        </div>

        <h2 className="section-title">If you need someone to talk to</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">Samaritans</div>
            <div className="option-description">
              Available 24 hours a day if you are struggling or just need
              someone to listen. Call 116 123 for free.
            </div>
            <a href="https://www.samaritans.org"target="_blank" rel="noreferrer" className="resource-link">
              Visit Samaritans →
            </a>
          </div>

          <div className="option-card">
            <div className="option-title">Mind</div>
            <div className="option-description">
              Mental health support and information for anyone going through
              a difficult time.
            </div>

            <a href="https://www.mind.org.uk"target="_blank" rel="noreferrer" className="resource-link">
              Visit Mind →
            </a>
          </div>
        </div>

        <h2 className="section-title">If the behaviour continues</h2>

        <div className="option-list">
          <div className="option-card">
            <div className="option-title">Keep a record</div>
            <div className="option-description">
              Screenshot any harmful content before reporting or blocking.
              This can be useful if you need to escalate the issue.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Report again</div>
            <div className="option-description">
              If the behaviour continues you can submit another report.
              Repeated reports help moderators identify patterns.
            </div>
          </div>

          <div className="option-card">
            <div className="option-title">Contact the police</div>
            <div className="option-description">
              If you feel you are in danger or the behaviour amounts to
              harassment or stalking, you can report it to the police.
            </div>
          </div>
        </div>

        <div className="button-row">
          <button className="button-secondary" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;