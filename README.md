# YSSE Course Search & Filter System (React + Vite)

A modern, responsive **Course Search & Filter System** built with **React** and **Vite** for the **YSSE Main Portal** (Week 6 Assignment). Designed with a cohesive emerald and botanical green theme, Framer-inspired spring transitions, and reusable component architecture.

## Features

- **Reusable Component Architecture**: Built with modular functional components (`App.jsx`, `SearchBar.jsx`, `FilterSection.jsx`, `CourseSection.jsx`, `CourseCard.jsx`, and `CourseModal.jsx`).
- **Real-Time Search**: Case-insensitive partial keyword filtering across course titles, descriptions, and categories.
- **Multi-Dimensional Filtering & Sorting**: Filter simultaneously by **Category** (`All Courses`, `Web Development`, `Programming`, `Graphic Design`, `Digital Marketing`, `Data Science`) and **Difficulty Level** (`All Levels`, `Beginner`, `Intermediate`, `Advanced`), plus sort alphabetically or by duration.
- **One-Click Filter Reset**: Instantly clears search queries, category tabs, difficulty filters, and sorting.
- **Conditional UI States**: Displays live filtered course counts, active filter chips, an empty-catalog fallback, and a friendly *"No courses found. Try adjusting your search or filters."* state.
- **Interactive Course Details Modal & Wishlist**: Click **View Course** on any card to inspect full learning outcomes, enroll, or save courses to your wishlist.
- **Responsive Green Design System**: Pure CSS3 variables, glassmorphism, staggered card reveals, and responsive grids across desktop, tablet, and mobile viewports.

## Project Structure

```text
ysse-course-system/
├── public/
│   └── images/               # Course cover banners & placeholder image
├── src/
│   ├── components/
│   │   ├── CourseCard.jsx    # Individual reusable course card
│   │   ├── CourseModal.jsx   # Interactive course syllabus & details modal
│   │   ├── CourseSection.jsx # Catalog header, live count, empty states & grid
│   │   ├── FilterSection.jsx # Category pills, level/sort selects & reset button
│   │   └── SearchBar.jsx     # Controlled search input with clear button
│   ├── data/
│   │   └── courses.js        # Course dataset, categories & difficulty constants
│   ├── App.css               # Component & responsive layout styles
│   ├── App.jsx               # Main state management & combined filtering logic
│   ├── index.css             # Emerald green design tokens & global reset
│   └── main.jsx              # React entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Getting Started

1. **Extract** the ZIP archive and navigate into the project folder:
   ```bash
   cd ysse-course-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. Open the local URL shown in your terminal (typically `http://localhost:5173`) in your browser.

## Tech Stack

- **React 18** (Functional Components, Props, `useState`, `.map()`, `.filter()`, Conditional Rendering)
- **Vite 5** (Fast HMR development server & bundler)
- **CSS3** (Custom properties, CSS Grid, Flexbox, spring cubic-bezier transitions)
