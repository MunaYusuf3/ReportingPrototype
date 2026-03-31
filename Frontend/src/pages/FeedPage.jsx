import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

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
      setLoadError("Something went wrong while loading content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportClick = (post) => {
    navigate("/report/options", { state: { post } });
  };

  const goNext = () => {
    if (currentIndex < posts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

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

        {!isLoading && currentPost && (
          <>
            <div className="summary-box">
              <div className="summary-item">
                <strong>Platform:</strong> {currentPost.reported_account.platform}
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
                onClick={() => handleReportClick(currentPost)}
              >
                Report this content
              </button>
            </div>

            <div className="button-row">
              <button
                className="button-secondary"
                onClick={goPrev}
                disabled={currentIndex === 0}
              >
                Previous
              </button>

              <button
                className="button-secondary"
                onClick={goNext}
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

        {!isLoading && !loadError && posts.length === 0 && (
          <p className="helper-text">No content available right now.</p>
        )}
      </div>
    </div>
  );
}

export default FeedPage;