function FilterSection({
  categories,
  levels,
  selectedCategory,
  selectedLevel,
  sortBy,
  onCategoryChange,
  onLevelChange,
  onSortChange,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="filter-section">
      {/* Category Pill Tabs */}
      <div className="category-pills-group" role="group" aria-label="Filter courses by category">
        <span className="filter-group-caption">Category</span>
        <div className="category-pills">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            const label = category === 'All' ? 'All Courses' : category;

            return (
              <button
                key={category}
                type="button"
                className={`category-pill ${isActive ? 'active' : ''}`}
                onClick={() => onCategoryChange(category)}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dropdown Filters & Reset Control */}
      <div className="filter-controls-row">
        <div className="select-controls">
          <div className="select-field">
            <label htmlFor="difficulty-select" className="select-label">
              Difficulty Level
            </label>
            <select
              id="difficulty-select"
              className="filter-select"
              value={selectedLevel}
              onChange={(e) => onLevelChange(e.target.value)}
              aria-label="Filter by difficulty level"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level === 'All' ? 'All Levels' : level}
                </option>
              ))}
            </select>
          </div>

          <div className="select-field">
            <label htmlFor="sort-select" className="select-label">
              Sort Courses
            </label>
            <select
              id="sort-select"
              className="filter-select"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label="Sort courses"
            >
              <option value="default">Featured Order</option>
              <option value="title-asc">Title: A → Z</option>
              <option value="title-desc">Title: Z → A</option>
              <option value="duration-asc">Duration: Shortest First</option>
              <option value="duration-desc">Duration: Longest First</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          className={`reset-filters-btn ${hasActiveFilters ? 'has-filters' : ''}`}
          onClick={onResetFilters}
          aria-label="Reset all filters"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}

export default FilterSection;
