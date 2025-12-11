# Portfolio Frontend (React + Vite)

![Frontend Logo](./public/frontend-logo.png)

This is the **public portfolio website** for _Chirag Bhandarkar_.

It renders all portfolio sections (hero, about, education, skills, projects, services, blog, contact, resume, etc.) with smooth navigation and animations.

---

## Features

- **Single-page portfolio UI** with hash-based navigation
- Sections for **About, Education, Skills, Projects, Services, Blog, Resume, Contact**
- Animated hero and transitions using **Framer Motion** and **GSAP**
- Responsive layout built with modern CSS

---

## Tech Stack

- **Framework:** React + Vite
- **Routing / Navigation:** Hash-based navigation (no React Router for main sections yet)
- **HTTP client:** Axios
- **Animations:** Framer Motion, GSAP
- **Data fetching helpers:** SWR
- **3D / visuals:** three

---

## Getting Started

You can either **clone** the repository with Git or **download** the project as a ZIP.

### 1. Clone with Git (recommended)

```bash
git clone <YOUR_REPO_URL>.git
cd chiragkb/frontend
```

> Replace `<YOUR_REPO_URL>` with the actual Git URL of this monorepo.

### 2. Download as ZIP (no Git)

1. Download the repository as a ZIP from your Git hosting (GitHub / GitLab).
2. Extract the ZIP file on your machine.
3. Open a terminal in the extracted folder and navigate to:

```bash
cd chiragkb/frontend
```

---

## Installation

From the `frontend` folder:

```bash
npm install
```

This will install all frontend dependencies defined in `package.json`.

---

## Running the Development Server

From the `frontend` folder:

```bash
npm run dev
```

Then open the printed URL (by default `http://localhost:5173`) in your browser.

---

## Building for Production

```bash
npm run build
```

This generates an optimized production build in the `dist` folder.

You can preview the production build locally with:

```bash
npm run preview
```

---

## Project Structure (frontend)

Key folders/files:

- `src/App.jsx` – main single-page layout and section navigation
- `src/components/` – all UI sections (Hero, About, Education, Skills, Projects, etc.)
- `src/assets/` – static assets (images, icons, etc.)
- `src/lib/` – helper utilities

---

## Environment Variables

If this frontend needs to talk to an API (e.g. the backend in `backend/`), configure the Vite env variables in a `.env` file in `/frontend` (for example):

```bash
VITE_API_BASE_URL=http://localhost:3000
```

Adjust the value based on your backend URL.

---

## Scripts

- `npm run dev` – start development server
- `npm run build` – build for production
- `npm run preview` – preview production build
- `npm run lint` – run ESLint

---

## License

This project is part of the personal portfolio of **Chirag Bhandarkar**.

