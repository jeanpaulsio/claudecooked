# claudecooked

`claudecooked` is a small Vite + React app for turning a prompt/response exchange into a styled terminal-image export.

## Run locally

### Requirements

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Start the local dev server

```bash
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173/`.

### Build for production

```bash
npm run build
```

This writes the production build to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

## Deploy

This repo is set up to deploy to GitHub Pages from GitHub Actions.

- Pushes to `main` trigger `.github/workflows/deploy-pages.yml`
- The workflow runs `npm ci`
- Then it runs `npm run build`
- Then it copies `CNAME` into `dist/`
- Then it deploys `dist/` to GitHub Pages

In the repository's GitHub Pages settings, the source should be set to `GitHub Actions`.

## Project structure

```text
.
├── assets/             # Favicons and social preview assets
├── src/
│   ├── components/     # Editor and canvas UI
│   ├── hooks/          # Small React hooks
│   ├── lib/            # Defaults and export helpers
│   ├── styles/         # App styles
│   ├── App.jsx         # Main app shell
│   └── main.jsx        # React entrypoint
├── index.html          # Vite HTML entry
├── package.json
└── vite.config.js
```

## Notes

- The app exports PNGs in-browser using `html2canvas`.
- Static assets under `assets/` are served directly by Vite.
- This project currently has no backend and no environment variables.
