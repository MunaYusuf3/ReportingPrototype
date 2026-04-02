function ProgressBar({ current, total }) {
  const dots = [];

  for (let i = 0; i < total; i++) {
    dots.push(
      <div
        key={i}
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          background: i < current ? "#0d9488" : "#e5e7eb",
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
      {dots}
      <span style={{ fontSize: "13px", color: "#6b7280", marginLeft: "4px" }}>
        Step {current} of {total}
      </span>
    </div>
  );
}

export default ProgressBar;