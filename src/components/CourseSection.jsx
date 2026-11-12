import CourseCard from './CourseCard';

function CourseSection({
  courses,
  totalCount,
  searchTerm,
  selectedCategory,
  selectedLevel,
  onResetFilters,
  onViewCourse,
  wishlistIds,
  onToggleWishlist,
}) {
  const hasFilters =
    searchTerm.trim() !== '' || selectedCategory !== 'All' || selectedLevel !== 'All';

  return (
    <section className="courses-section" aria-labelledby="courses-section-heading">
      {/* Section Header & Dynamic Result Counter */}
      <div className="courses-section-header">
        <div>
          <span className="section-eyebrow">CURRICULUM CATALOG</span>
          <h2 id="courses-section-heading" className="section-heading">
            Available Courses
          </h2>
        </div>

        <div className="results-summary-bar" aria-live="polite">
          <span className="pulse-indicator" aria-hidden="true" />
          <p className="results-count-text">
            Showing <strong>{courses.length}</strong> of <strong>{totalCount}</strong>{' '}
            {courses.length === 1 ? 'course' : 'courses'}
          </p>
        </div>
      </div>

      {/* Active Filter Tags (Conditional Rendering) */}
      {hasFilters && (
        <div className="active-filters-strip">
          <span className="active-filters-label">Active Filters:</span>
          {searchTerm.trim() !== '' && (
            <span className="active-filter-chip">Search: “{searchTerm.trim()}”</span>
          )}
          {selectedCategory !== 'All' && (
            <span className="active-filter-chip">Category: {selectedCategory}</span>
          )}
          {selectedLevel !== 'All' && (
            <span className="active-filter-chip">Level: {selectedLevel}</span>
          )}
          <button
            type="button"
            className="inline-reset-link"
            onClick={onResetFilters}
          >
            Clear all
          </button>
        </div>
      )}

      {/* Conditional Rendering: Empty Course Catalog vs No Search Matches vs Course Grid */}
      {totalCount === 0 ? (
        <div className="empty-state-card" role="status">
          <div className="empty-state-icon" aria-hidden="true">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
          </div>
          <h3 className="empty-state-title">No Courses Available Right Now</h3>
          <p className="empty-state-text">
            Our curriculum catalog is currently being updated. Please check back soon.
          </p>
        </div>
      ) : courses.length === 0 ? (
        <div className="empty-state-card" role="status">
          <div className="empty-state-icon" aria-hidden="true">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </div>
          <h3 className="empty-state-title">No Matching Courses</h3>
          <p className="empty-state-text">
            No courses found. Try adjusting your search or filters.
          </p>
          <button
            type="button"
            className="empty-reset-btn"
            onClick={onResetFilters}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course, index) => (
            <CourseCard
              key={course.id}
              course={course}
              index={index}
              onViewCourse={onViewCourse}
              isWishlisted={wishlistIds.includes(course.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default CourseSection;
