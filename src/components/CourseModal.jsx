function CourseModal({
  course,
  onClose,
  isWishlisted,
  onToggleWishlist,
  isEnrolled,
  onEnroll,
}) {
  if (!course) return null;

  const handleImageError = (e) => {
    if (e.currentTarget.src !== `${window.location.origin}/images/placeholder.jpg`) {
      e.currentTarget.src = '/images/placeholder.jpg';
    }
  };

  return (
    <div
      className="modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-course-title"
      onClick={onClose}
    >
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close course details"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="modal-hero">
          <img
            src={course.image}
            alt={course.title}
            className="modal-hero-img"
            onError={handleImageError}
          />
          <div className="modal-hero-overlay" />
          <div className="modal-hero-content">
            <div className="modal-badges">
              <span className="modal-badge-category">{course.category}</span>
              <span className="modal-badge-level">{course.level}</span>
            </div>
            <h2 id="modal-course-title" className="modal-title">
              {course.title}
            </h2>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-stats-grid">
            <div className="modal-stat-box">
              <span className="modal-stat-label">Duration</span>
              <strong className="modal-stat-value">{course.duration}</strong>
            </div>
            <div className="modal-stat-box">
              <span className="modal-stat-label">Difficulty</span>
              <strong className="modal-stat-value">{course.level}</strong>
            </div>
            <div className="modal-stat-box">
              <span className="modal-stat-label">Track</span>
              <strong className="modal-stat-value">{course.category}</strong>
            </div>
          </div>

          <div className="modal-section">
            <h3 className="modal-section-title">Course Overview</h3>
            <p className="modal-description">{course.description}</p>
          </div>

          {course.outcomes && course.outcomes.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">What You Will Learn</h3>
              <ul className="modal-outcomes-list">
                {course.outcomes.map((outcome, idx) => (
                  <li key={idx} className="modal-outcome-item">
                    <span className="outcome-check" aria-hidden="true">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className={`modal-enroll-btn ${isEnrolled ? 'enrolled' : ''}`}
              onClick={() => onEnroll(course.id)}
            >
              {isEnrolled ? 'Enrolled in Course ✓' : 'Enroll Now'}
            </button>

            <button
              type="button"
              className={`modal-wishlist-btn ${isWishlisted ? 'active' : ''}`}
              onClick={() => onToggleWishlist(course.id)}
            >
              {isWishlisted ? 'Saved to Wishlist ♥' : 'Save to Wishlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseModal;
