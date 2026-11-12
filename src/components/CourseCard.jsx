function CourseCard({ course, index, onViewCourse, isWishlisted, onToggleWishlist }) {
  const levelModifier = course.level.toLowerCase();

  const handleImageError = (e) => {
    if (e.currentTarget.src !== `${window.location.origin}/images/placeholder.jpg`) {
      e.currentTarget.src = '/images/placeholder.jpg';
    }
  };

  return (
    <article
      className="course-card"
      style={{ '--stagger-index': index }}
    >
      <div className="course-card-media" onClick={() => onViewCourse(course)}>
        <img
          src={course.image}
          alt={course.title}
          className="course-card-img"
          loading="lazy"
          onError={handleImageError}
        />
        <div className="course-card-scrim" aria-hidden="true" />

        <div className="course-card-top-badges">
          <span className="course-category-chip">{course.category}</span>
          {course.featured && <span className="course-featured-chip">Featured</span>}
        </div>

        <button
          type="button"
          className={`wishlist-icon-btn ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(course.id);
          }}
          aria-label={
            isWishlisted
              ? `Remove ${course.title} from saved courses`
              : `Save ${course.title} to wishlist`
          }
          title={isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
      </div>

      <div className="course-card-body">
        <div className="course-card-meta-row">
          <span className={`difficulty-badge ${levelModifier}`}>
            <span className="difficulty-dot" aria-hidden="true" />
            {course.level}
          </span>

          <span className="duration-tag">
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            {course.duration}
          </span>
        </div>

        <h3 className="course-card-title" onClick={() => onViewCourse(course)}>
          {course.title}
        </h3>

        <p className="course-card-description">{course.description}</p>

        <div className="course-card-footer">
          <button
            type="button"
            className="view-course-btn"
            onClick={() => onViewCourse(course)}
          >
            <span>View Course</span>
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default CourseCard;
