// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function FeedPage() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [loadError, setLoadError] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     loadContent();
//   }, []);

//   const loadContent = async () => {
//     try {
//       const response = await fetch("http://127.0.0.1:8000/api/content/");

//       if (!response.ok) {
//         throw new Error("Could not get content");
//       }

//       const data = await response.json();
//       setPosts(data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setLoadError("Something went wrong while");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleReportClick = (post) => {
//     navigate("/report/options", { state: { post } });
//   };

//   return (
//     <div className="app">
//       <h1>Reporting Prototype</h1>
//       <p className="subtitle">Example content for testing the reporting flow</p>

//       {isLoading && <p>Loading...</p>}
//       {loadError && <p>{loadError}</p>}

//       <div className="content-list">
//         {posts.map((post) => (
//           <div className="content-card" key={post.id}>
//             <p><strong>Platform:</strong> {post.reported_account.platform}</p>
//             <p><strong>User:</strong> {post.reported_account.username}</p>
//             <p><strong>Content type:</strong> {post.content_type}</p>
//             <p><strong>Message:</strong> {post.text}</p>

//             <button onClick={() => handleReportClick(post)}>
//               Options
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default FeedPage;

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
      setLoadError("Something went wrong while loading content");
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
    <div className="app">
      <h1>Reporting Prototype</h1>
      <p className="subtitle">Example content for testing the reporting flow</p>

      {isLoading && <p>Loading...</p>}
      {loadError && <p>{loadError}</p>}

      {!isLoading && currentPost && (
        <div className="content-card">
          <p><strong>Platform:</strong> {currentPost.reported_account.platform}</p>
          <p><strong>User:</strong> {currentPost.reported_account.username}</p>
          <p><strong>Content type:</strong> {currentPost.content_type}</p>
          <p><strong>Message:</strong> {currentPost.text}</p>

          <button onClick={() => handleReportClick(currentPost)}>
            Options
          </button>

          <div style={{ marginTop: "20px" }}>
            <button onClick={goPrev} disabled={currentIndex === 0}>
              Prev
            </button>

            <button
              onClick={goNext}
              disabled={currentIndex === posts.length - 1}
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedPage;