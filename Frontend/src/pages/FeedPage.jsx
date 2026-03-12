import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
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
      setLoadError("Something went wrong while");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportClick = (post) => {
    navigate("/report/reason", { state: { post } });
  };

  return (
    <div className="app">
      <h1>Reporting Prototype</h1>
      <p className="subtitle">Example content for testing the reporting flow</p>

      {isLoading && <p>Loading...</p>}
      {loadError && <p>{loadError}</p>}

      <div className="content-list">
        {posts.map((post) => (
          <div className="content-card" key={post.id}>
            <p><strong>Platform:</strong> {post.reported_account.platform}</p>
            <p><strong>User:</strong> {post.reported_account.username}</p>
            <p><strong>Content type:</strong> {post.content_type}</p>
            <p><strong>Message:</strong> {post.text}</p>

            <button onClick={() => handleReportClick(post)}>
              Report this
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeedPage;