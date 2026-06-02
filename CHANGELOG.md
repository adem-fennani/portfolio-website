# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-06-02

### Added
- **Download CV** button in the hero, serving `assets/cv.pdf` with a download icon.
- Two-column hero layout: bio column with CTAs and stats row, plus an interactive profile card with layered glow effects and floating badges.
- "Open to Opportunities" status badge with animated pulse indicator.
- Decorative ambient background glow blobs behind the hero.
- **Outfit** and **JetBrains Mono** typography via Google Fonts.
- Pointer-tracking border glow on profile, skill category, and project cards (respects `prefers-reduced-motion`).
- Per-category skill tag colors (programming, backend, frontend, database, DevOps) replacing individual neon highlights.
- GitHub repository link for the Grinta project.

### Changed
- Complete visual redesign: light theme with premium cyan and sunset orange accents, replacing the previous dark blue palette.
- Revamped hero section from a single glass card to a split layout with staggered fade-up animations.
- Relocated social links beneath the profile card; updated favicon to a developer emoji.
- Enriched hero copy, statistics row ("3+ Years Coding", "10+ Projects", "Cloud Enthusiast"), and primary CTAs ("View Projects", "Download CV").
- Skill label corrections (`Next.js`, `OpenStack`) and `rel="noopener noreferrer"` on external project links.

## [0.3.0] - 2026-05-28

### Added
- "Grinta" full-stack angular/spring boot project to the portfolio.
- "Private Cloud & Kubernetes" OpenStack and Ansible project card.
- SVG icons for GitHub, LinkedIn, and Live Demo project links.
- GitHub Actions deployment workflow (`deploy.yml`).

### Changed
- Completely revamped the "Languages and Tools" section, separating skills into specific categories (Programming Languages, Backend, Frontend, Databases, DevOps & Infrastructure).
- Applied custom neon glassmorphism highlights for core competencies.
- Enriched project descriptions, skills tags, and added direct external links.

## [0.2.0] - 2026-05-06

### Added
- Lightweight particle/canvas background animation
- Social icon float animation with hover ripple
- Click-to-copy email shortcut with toast confirmation
- External `styles.css` and `main.js` files (moved inline styles/scripts)

### Changed
- Updated site color palette to a dark-blue (60%) / cyan (30%) / orange (10%) scheme
- Refactored inline CSS/JS into separate files and improved accessibility for motion preferences

## [0.1.0] - 2026-01-04

### Added
- Initial portfolio website with glass morphism design
- Animated gradient background
- Social links (GitHub, LinkedIn, Email)
- Responsive design for mobile and tablet devices
- Coming soon badge and under development notice
- Smiley face favicon
