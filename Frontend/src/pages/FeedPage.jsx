import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../utils";
import "./styling/FeedPage.css";

function FakeContent() {
  return (
    <div style={{ padding: "8px 0" }}>
      <div style={{ height: "10px", borderRadius: "6px", background: "#ccc", opacity: 0.4, marginBottom: "10px", width: "100%", filter: "blur(3px)" }} />
      <div style={{ height: "10px", borderRadius: "6px", background: "#ccc", opacity: 0.4, marginBottom: "10px", width: "80%", filter: "blur(3px)" }} />
      <div style={{ height: "10px", borderRadius: "6px", background: "#ccc", opacity: 0.4, marginBottom: "10px", width: "60%", filter: "blur(3px)" }} />
      <div style={{ height: "10px", borderRadius: "6px", background: "#ccc", opacity: 0.4, marginBottom: "10px", width: "100%", filter: "blur(3px)" }} />
      <div style={{ height: "10px", borderRadius: "6px", background: "#ccc", opacity: 0.4, marginBottom: "10px", width: "80%", filter: "blur(3px)" }} />
    </div>
  );
}

function InfoButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="info-wrapper">
      <div className="info-circle" onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        ℹ
      </div>
      {open && (
        <div className="info-popup">
          Tap the post to report harmful content
        </div>
      )}
    </div>
  );
}

function InstagramPost({ post, onClick }) {
  return (
    <div className="instagram-card" onClick={onClick}>
      <InfoButton />

      <div className="instagram-header">
        <span>Instagram</span>
      </div>

      <div className="instagram-user">
        <div className="instagram-avatar" />
        <div>
          {post.reported_account?.username}
        </div>
        <span style={{ marginLeft: "auto", color: "#999" }}>•••</span>
      </div>

      <div className="instagram-image">
        <div className="instagram-image-blur">
          <FakeContent count={8} color="#aaa" />
        </div>
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

function WhatsAppChat({ post, onClick }) {
  return (
    <div className="whatsapp-card" onClick={onClick}>
      <InfoButton />

      <div className="whatsapp-header">
        <span style={{ fontSize: "16px" }}>←</span>
        <div className="whatsapp-avatar" />
        <div>
          <div>
            {post.reported_account?.username}
          </div>

        </div>
      </div>

      <div className="whatsapp-chat">
        <div className="whatsapp-received">
          <FakeContent count={2} color="#999" />
        </div>

        <div className="whatsapp-sent-row">
          <div className="whatsapp-sent">
            <FakeContent count={2} color="#888" />
          </div>
        </div>

        <div className="whatsapp-flagged">
          <p>{post.text}</p>
          <span>Long press to report</span>
        </div>

        <div className="whatsapp-sent-row">
          <div className="whatsapp-sent">
            <FakeContent count={1} color="#888" />
          </div>
        </div>
      </div>

      <div className="whatsapp-input">
        <div className="whatsapp-input-box">Message</div>
      </div>
    </div>
  );
}

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