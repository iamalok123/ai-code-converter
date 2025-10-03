## AI Code Converter

Convert code snippets between languages in the browser using a sleek, responsive UI. This project is built with React + Vite, Tailwind CSS v4, CodeMirror, and an in-browser AI provider exposed via `window.puter.ai.chat`.

### Features
- **Live editor**: Input and output panes powered by CodeMirror
- **One-click convert**: Converts to selected target language
- **Copy & reset**: Copy results to clipboard and reset input quickly
- **Status feedback**: Clear loading/success/error indicators
- **No backend required**: Uses `https://js.puter.com/v2/` to expose `window.puter.ai`

### Tech Stack
- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite`
- **Editor**: `@uiw/react-codemirror` with Dracula theme
- **Icons**: `lucide-react`

---

## Getting Started

### Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ (or a compatible package manager)

### Install
```bash
npm install
```

### Run locally (dev server)
```bash
npm run dev
```
Open the printed local URL in your browser.

### Build
```bash
npm run build
```
The production build is output to `dist/`.

### Preview production build
```bash
npm run preview
```

---

## Usage
1. Enter or paste code in the left editor.
2. Choose a target language from the dropdown (e.g., Python, Java, C++, Go, Rust, TypeScript).
3. Click Convert. When finished, the converted code appears on the right.
4. Use Copy to copy the output or Reset to restore the default example.

Note: The app waits for `window.puter.ai.chat` to be available and shows “AI is not ready yet” until the external script loads.

---

## Configuration

### Tailwind CSS v4
This project uses Tailwind v4 with the official Vite plugin:
- `vite.config.js` includes `@tailwindcss/vite` in `plugins`
- `src/index.css` imports Tailwind with `@import "tailwindcss";`

If you install dependencies manually, ensure the plugin is present:
```bash
npm install -D @tailwindcss/vite
```

### External AI script
`index.html` includes:
```html
<script src="https://js.puter.com/v2/"></script>
```
This script provides `window.puter.ai.chat`. If the script is blocked by the network or a CSP, the app will remain in the “AI not ready” state.

---

## Deploying to Vercel

This is a standard Vite static build.

1. Push the repository to GitHub/GitLab/Bitbucket.
2. On Vercel, import the project.
3. Use the defaults or set:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy.

If the Vercel build fails with a plugin resolution error, verify `@tailwindcss/vite` is listed under `devDependencies` and reinstall (`npm install`).

---

## Troubleshooting

- **AI is not ready yet**
  - The external script may not have loaded yet. Wait a moment or check browser network tab for `https://js.puter.com/v2/`.
  - Ensure no ad blockers or CSP rules are blocking the script.

- **Build fails on Vercel (Tailwind/Vite plugin not found)**
  - Install the missing plugin: `npm install -D @tailwindcss/vite`
  - Re-deploy.

- **Blank page or hydration issues**
  - Ensure you are using a static deployment (Vite output in `dist`).
  - The app guards access to `window.puter`, so it should not error during initial render.

- **Conversion quality**
  - Results depend on the AI provider. The prompt asks for code-only output, but formatting may still vary.

---

## Scripts
- **dev**: Start Vite dev server
- **build**: Build for production
- **preview**: Preview the production build
- **lint**: Run ESLint

---

## License

No license specified. If you plan to open-source, add a suitable license file.
