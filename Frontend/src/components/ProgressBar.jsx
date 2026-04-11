function ProgressBar({ current, total }) {
  const dots = [];

  for (let i = 0; i < total; i++) {
    dots.push(
      <div key={i} className={`progress-dot ${i < current ? "active" : ""}`} />
    );
  }

  return (
    <div className="progress-bar">
      {dots}
      <span className="progress-label">Step {current} of {total}</span>
    </div>
  );
}

export default ProgressBar;