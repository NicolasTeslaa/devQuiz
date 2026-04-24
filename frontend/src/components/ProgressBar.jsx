function ProgressBar({ current, total }) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="progress-wrapper" aria-label="Progresso do quiz">
      <div className="progress-meta">
        <span>Progresso</span>
        <strong>
          {current}/{total}
        </strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
