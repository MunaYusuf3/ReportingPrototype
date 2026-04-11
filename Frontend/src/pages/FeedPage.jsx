import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils";
import "./styling/FeedPage.css";


// fake instagram page with reported content
function InstagramPost({ post, onClick }) {
  return (
    <div className="instagram-card" onClick={onClick}>
      <div className="instagram-header">
        <span>Instagram</span>
      </div>

      <div className="instagram-user">
        <div className="instagram-avatar" />
        <div>{post.reported_account?.username}</div>
        <span className="instagram-more">•••</span>
      </div>

      <div className="instagram-image">
        <div className="instagram-image-overlay">
          <p>Tap the post to report harmful content</p>
        </div>
      </div>

      <div className="instagram-caption">
        <strong>{post.reported_account?.username}</strong>{" "}
        <span>{post.text}</span>
      </div>
    </div>
  );
}

// fake whatsapp chat with reported content
function WhatsAppChat({ post, onClick }) {
  return (
    <div className="whatsapp-card" onClick={onClick}>
      <div className="whatsapp-header">
        <span className="whatsapp-back">←</span>
        <div className="whatsapp-avatar" />
        <div>{post.reported_account?.username}</div>
      </div>

      <div className="whatsapp-chat">
        <div className="whatsapp-received" />

        <div className="whatsapp-sent-row">
          <div className="whatsapp-sent" />
        </div>

      <div className="whatsapp-flagged">
        <p>{post.text}</p>
        <span>Long press to report</span>
       </div>

      <div className="whatsapp-sent-row">
          <div className="whatsapp-sent" />
      </div>
    </div>

      <div className="whatsapp-input">
        <div className="whatsapp-input-box">Message</div>
      </div>
    </div>
  );
}

// main feedpage (loads post from the API and displays one post at a time for reporting)
function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/content/`);
        if (!response.ok) throw new Error("Could not load content");
        const data = await response.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while loading content.");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, []);

  const currentPost = posts[currentIndex];
  const platform = currentPost?.reported_account?.platform?.toLowerCase();

  const handleTap = () => {
    navigate("/report/options", { state: { post: currentPost } });
  };

  return (
    <div className="feed-page">
      {loading && <p className="helper-text">Loading...</p>}
      {error && <div className="error-message">{error}</div>}
      {!loading && !error && posts.length === 0 && (
        <p className="helper-text">No content available.</p>
      )}

      {!loading && currentPost && (
        <>
          {platform === "instagram" && (
            <InstagramPost post={currentPost} onClick={handleTap} />
          )}
          {platform === "whatsapp" && (
            <WhatsAppChat post={currentPost} onClick={handleTap} />
          )}

          <div className="feed-navigation">
            <button
              className="button-secondary feed-nav-button"
              onClick={() => setCurrentIndex((i) => (i - 1 + posts.length) % posts.length)}
            >
              ←
            </button>
            <button
              className="button-secondary feed-nav-button"
              onClick={() => setCurrentIndex((i) => (i + 1) % posts.length)}
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default FeedPage;