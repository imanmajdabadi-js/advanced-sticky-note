# Advanced Sticky Note

A React-based application for creating, editing, and managing customizable sticky notes with drag-and-drop functionality. Currently a basic setup with local storage persistence; performance optimizations in progress.

## Features

- Create and edit notes with rich text support.
- Drag, resize, and layer notes (z-index management).
- Persistent storage using local hooks (e.g., `useStickyNotesStorage`).

## Installation

1. Clone the repo: `git clone https://github.com/imanmajdabadi-js/advanced-sticky-note.git`
2. Install dependencies: `npm install`
3. Run dev server: `npm run dev`

## Tech Stack

- React + TypeScript
- Vite for build tooling
- ESLint + Prettier for code quality

## Current Status

Master branch is functional but has redundant state logic leading to potential performance issues (e.g., unnecessary re-renders). A refactor branch is in progress using Redux for centralized state management to eliminate duplicates and improve scalability.

## Roadmap

- Complete Redux integration.

## Screenshot

!['ScreenShot](https://raw.github.com/imanmajdabadi-js/advanced-sticky-note/Master/public/assets/images/screenShot/stickyNote-screen.png)
