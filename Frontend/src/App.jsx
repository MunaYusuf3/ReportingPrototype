import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [chosenPost, setChosenPost] = useState(null);
  const [reason, setReason] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/content/");

      if (!response.ok) {
        throw new Error("Could not get content");
      }

      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Fetch error:", err);
      setLoadError("Something went wrong while loading the content.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setChosenPost(null);
    setReason("");
    setExtraInfo("");
  };

  const submitReport = async () => {
    if (!chosenPost) return;

    if (reason === "") {
      alert("Please choose a reason before submitting.");
      return;
    }

    const reportData = {
      platform: chosenPost.reported_account.platform,
      username: chosenPost.reported_account.username,
      content_id: chosenPost.content_id,
      content_type: chosenPost.content_type,
      text: chosenPost.text,
      category: reason,
      description: extraInfo,
      reporter_id: "demo_user",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/reports/submit/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error("Submit failed");
      }

      const result = await response.json();

      setSubmitMessage(
        `Report sent. Account status is now ${result.account_status} and total reports are ${result.report_count}.`
      );

      resetForm();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Your report could not be submitted.");
    }
  };

  return (
    <div className="app">
      <h1>Reporting Prototype</h1>
      <p className="subtitle">Example content for testing the reporting flow</p>

      {isLoading && <p>Loading...</p>}
      {loadError && <p className="error-message">{loadError}</p>}
      {submitMessage && <p className="success-message">{submitMessage}</p>}

      <div className="content-list">
        {posts.map((post) => (
          <div className="content-card" key={post.id}>
            <p><strong>Platform:</strong> {post.reported_account.platform}</p>
            <p><strong>User:</strong> {post.reported_account.username}</p>
            <p><strong>Content type:</strong> {post.content_type}</p>
            <p><strong>Message:</strong> {post.text}</p>

            <button onClick={() => {
              setChosenPost(post);
              setSubmitMessage("");
            }}>
              Report this
            </button>
          </div>
        ))}
      </div>

      {chosenPost && (
        <div className="report-form">
          <h2>Submit report</h2>
          <p><strong>Reported content:</strong> {chosenPost.text}</p>

          <label htmlFor="reason">Why are you reporting this?</label>
          <select
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="">Choose a reason</option>
            <option value="harassment_or_bullying">Harassment or bullying</option>
            <option value="hate_or_discrimination">Hate or discrimination</option>
            <option value="threats_or_intimidation">Threats or intimidation</option>
            <option value="misinformation">False or misleading information</option>
            <option value="scams_or_impersonation">Spam or impersonation</option>
            <option value="sexual_content">Non-consensual or sexual content</option>
            <option value="something_else">Other</option>
          </select>

          <label htmlFor="extraInfo">Extra information</label>
          <textarea
            id="extraInfo"
            placeholder="Add more detail if needed"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          <div className="form-buttons">
            <button onClick={submitReport}>Send report</button>
            <button className="cancel-button" onClick={resetForm}>
              Go back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;