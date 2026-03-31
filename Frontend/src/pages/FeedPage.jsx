import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  // fetch content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/content/`);
        if (!response.ok) throw new Error("Could not load content");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoadError("Something went wrong while loading content.");
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const currentPost = posts[currentIndex];

  return (
    <div className="page">
      <div className="card">
        <h1 className="page-title">Reporting Prototype</h1>
        <p className="page-subtitle">
          Example content for testing the reporting flow.
        </p>

        {isLoading && <p className="helper-text">Loading content...</p>}

        {loadError && <div className="error-message">{loadError}</div>}

        {!isLoading && !loadError && posts.length === 0 && (
          <p className="helper-text">No content available right now.</p>
        )}

        {!isLoading && currentPost && (
          <>
            <div className="summary-box">
              <div className="summary-item">
                <strong>Platform:</strong>{" "}
                {currentPost.reported_account.platform}
              </div>
              <div className="summary-item">
                <strong>User:</strong> {currentPost.reported_account.username}
              </div>
              <div className="summary-item">
                <strong>Content type:</strong> {currentPost.content_type}
              </div>
              <div className="summary-item">
                <strong>Message:</strong> {currentPost.text}
              </div>
            </div>
            <div className="button-row">
              <button
                className="button-primary"
                onClick={() =>
                  navigate("/report/options", { state: { post: currentPost } })
                }
              >
                Report this content
              </button>
            </div>

            <div className="button-row">
              <button
                className="button-secondary"
                onClick={() => setCurrentIndex((i) => i - 1)}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                className="button-secondary"
                onClick={() => setCurrentIndex((i) => i + 1)}
                disabled={currentIndex === posts.length - 1}
              >
                Next
              </button>
            </div>

            <p className="helper-text">
              Post {currentIndex + 1} of {posts.length}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedPage;
