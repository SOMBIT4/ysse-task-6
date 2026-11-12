import { useState } from 'react';
import {
  courses as initialCourses,
  CATEGORIES,
  DIFFICULTY_LEVELS,
} from './data/courses';
import SearchBar from './components/SearchBar';
import FilterSection from './components/FilterSection';
import CourseSection from './components/CourseSection';
import CourseModal from './components/CourseModal';
import './App.css';

function App() {
  // Core Search & Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // Interactive UI States (Modal, Wishlist, Enrollment)
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);

  // Combined Search + Category + Difficulty Filtering Logic
  const filteredCourses = initialCourses
    .filter((course) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();

      const matchesSearch =
        normalizedSearch === '' ||
        course.title.toLowerCase().includes(normalizedSearch) ||
        course.description.toLowerCase().includes(normalizedSearch) ||
        course.category.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchesLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'duration-asc') return a.durationWeeks - b.durationWeeks;
      if (sortBy === 'duration-desc') return b.durationWeeks - a.durationWeeks;
      return 0;
    });

  const hasActiveFilters =
    searchTerm.trim() !== '' ||
    selectedCategory !== 'All' ||
    selectedLevel !== 'All' ||
    sortBy !== 'default';

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('default');
  };

  const handleToggleWishlist = (courseId) => {
    setWishlistIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleEnrollCourse = (courseId) => {
    setEnrolledIds((prev) =>
      prev.includes(courseId) ? prev : [...prev, courseId]
    );
  };

  return (
    <div className="app-shell">
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-contact">
            <span>info@ysseglobal.org</span>
            <span className="dot-sep" aria-hidden="true">•</span>
            <span>+880 123 456 7890</span>
          </div>
          <div className="top-bar-badge">
            <span className="status-dot" aria-hidden="true" />
            <span>YSSE Main Portal — Stage of Innovation</span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="hero-header">
        <div className="hero-glow-orb orb-1" aria-hidden="true" />
        <div className="hero-glow-orb orb-2" aria-hidden="true" />
        <div className="hero-grid-pattern" aria-hidden="true" />

        <div className="container hero-container">
          <nav className="navbar" aria-label="Primary Navigation">
            <a href="#top" className="brand-lockup">
              <span className="brand-mark">Y</span>
              <div>
                <span className="brand-name">YSSE</span>
                <span className="brand-tagline">Stage of Innovation</span>
              </div>
            </a>

            <div className="nav-links">
              <a href="#courses" className="nav-item active">
                Courses
              </a>
              <a href="#about" className="nav-item">
                About YSSE
              </a>
              <a href="#contact" className="nav-item">
                Contact
              </a>
              {wishlistIds.length > 0 && (
                <span className="saved-counter-pill" title="Saved Courses">
                  Saved ({wishlistIds.length})
                </span>
              )}
            </div>
          </nav>

          <div className="hero-content">
            <div className="hero-pill">
              <span className="hero-pill-dot" aria-hidden="true" />
              <span>YOUTH FOR SOCIAL SERVICE &amp; EMPOWERMENT</span>
            </div>

            <h1 className="hero-title">
              Explore Future-Ready <span className="hero-title-highlight">Courses</span>
            </h1>

            <p className="hero-subtitle">
              Empowering youth through practical education and meaningful action. Filter by
              track, skill level, or keyword to find your next career breakthrough.
            </p>

            <div className="hero-stats">
              <div className="hero-stat-card">
                <span className="hero-stat-number">1,000+</span>
                <span className="hero-stat-label">Active Learners</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-number">{initialCourses.length}</span>
                <span className="hero-stat-label">Specialized Courses</span>
              </div>
              <div className="hero-stat-card">
                <span className="hero-stat-number">{CATEGORIES.length - 1}</span>
                <span className="hero-stat-label">Career Tracks</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="courses" className="main-workspace">
        <div className="container">
          {/* Elevated Command Bar: Search + Filters */}
          <section className="command-panel" aria-label="Course Search and Filters">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onClearSearch={() => setSearchTerm('')}
            />

            <FilterSection
              categories={CATEGORIES}
              levels={DIFFICULTY_LEVELS}
              selectedCategory={selectedCategory}
              selectedLevel={selectedLevel}
              sortBy={sortBy}
              onCategoryChange={setSelectedCategory}
              onLevelChange={setSelectedLevel}
              onSortChange={setSortBy}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </section>

          {/* Dynamic Course Catalog */}
          <CourseSection
            courses={filteredCourses}
            totalCount={initialCourses.length}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            selectedLevel={selectedLevel}
            onResetFilters={handleResetFilters}
            onViewCourse={setSelectedCourse}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        </div>
      </main>

      {/* Course Details Modal (Conditional Rendering) */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        isWishlisted={selectedCourse ? wishlistIds.includes(selectedCourse.id) : false}
        onToggleWishlist={handleToggleWishlist}
        isEnrolled={selectedCourse ? enrolledIds.includes(selectedCourse.id) : false}
        onEnroll={handleEnrollCourse}
      />

      {/* Footer */}
      <footer id="contact" className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div className="brand-lockup footer-brand">
                <span className="brand-mark">Y</span>
                <div>
                  <span className="brand-name">YSSE</span>
                  <span className="brand-tagline">Stage of Innovation</span>
                </div>
              </div>
              <p className="footer-about">
                Empowering youth through compassion and purpose. Transforming challenges
                into sustainable opportunities for lasting community impact.
              </p>
            </div>

            <div>
              <h3 className="footer-col-title">Learning Tracks</h3>
              <ul className="footer-list">
                <li>Web Development</li>
                <li>Programming</li>
                <li>Data Science</li>
                <li>Graphic Design</li>
                <li>Digital Marketing</li>
              </ul>
            </div>

            <div id="about">
              <h3 className="footer-col-title">Contact YSSE</h3>
              <ul className="footer-list">
                <li>info@ysseglobal.org</li>
                <li>+880 123 456 7890</li>
                <li>Dhaka, Bangladesh</li>
                <li>www.ysseglobal.org</li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} YSSE (Youth for Social Service &amp;
              Empowerment). All rights reserved.
            </p>
            <p className="footer-subcredit">
              YSSE IT Department — React Course Search &amp; Filter Portal
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
