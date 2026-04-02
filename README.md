# nasyrovt.github.io

Personal portfolio site for Timur Nasyrov — game developer. Built with SvelteKit, Threlte (Three.js), GSAP, and Tailwind CSS. Deployed as a static site to GitHub Pages.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | SvelteKit (static adapter) + TypeScript |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| 3D | Threlte + Three.js (geometric wireframes, particle starfield) |
| Animation | GSAP + ScrollTrigger (scroll-based reveals, parallax) |
| Content | mdsvex (Markdown → Svelte) + YAML project data |
| Deployment | GitHub Actions → GitHub Pages |

## Prerequisites

- **Node.js** >= 20
- **npm** >= 9

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/nasyrovt/nasyrovt.github.io.git
cd nasyrovt.github.io
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start the dev server

```sh
npm run dev
```

The site will be available at `http://localhost:5173/`. Changes to any file will hot-reload automatically.

To open the browser automatically:

```sh
npm run dev -- --open
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build static site into `build/` |
| `npm run preview` | Serve the production build locally |
| `npm run check` | Run `svelte-check` for type errors |
| `npm run check:watch` | Same as above, in watch mode |

## Building for Production

```sh
npm run build
```

This runs the Vite build pipeline and the SvelteKit static adapter. Output is written to the `build/` directory. All pages are pre-rendered as static HTML:

```
build/
├── index.html                          # Home page
├── 404.html                            # Fallback error page
├── projects/
│   ├── simple-shooter/index.html
│   ├── pad-break/index.html
│   ├── planet-assault/index.html
│   ├── guardian-of-galaxy/index.html
│   ├── toon-tanks-rts/index.html
│   └── tower-defense/index.html
├── fonts/                              # Woff2 font files
├── images/projects/                    # Project screenshots
├── _app/                               # JS/CSS bundles
└── .nojekyll                           # Prevents Jekyll processing
```

### Preview the production build

After building, you can serve the output locally to verify everything works:

```sh
npm run preview
```

This starts a local server (usually at `http://localhost:4173/`) serving the exact files that will be deployed.

## Project Structure

```
src/
├── app.css                    # Global styles: Tailwind, fonts, 3 theme definitions, gradients
├── app.html                   # HTML shell with data-theme attribute
├── app.d.ts                   # TypeScript declarations (YAML, MD imports)
├── lib/
│   ├── components/
│   │   ├── Header.svelte      # Sticky header with logo, GitHub link, theme toggle
│   │   ├── Footer.svelte      # Copyright footer
│   │   ├── Hero.svelte        # Hero section with 3D scene + GSAP entrance
│   │   ├── ProjectsSection.svelte  # Projects listing with curved SVG dividers
│   │   ├── ProjectCard.svelte      # Individual project card (alternating layout)
│   │   ├── AboutMe.svelte     # About section with info cards
│   │   ├── ContactCTA.svelte  # Contact links (email, GitHub, CV)
│   │   ├── SEO.svelte         # <head> meta, OG, Twitter, JSON-LD
│   │   ├── ThemeSwitch.svelte # Theme cycling button
│   │   └── shapes/            # Decorative Circle, Donut, CircleGrid
│   ├── three/
│   │   ├── Scene.svelte       # Threlte Canvas wrapper
│   │   ├── GeometricShapes.svelte  # Floating wireframe polyhedra
│   │   ├── Particles.svelte   # 500-point animated starfield
│   │   └── Lights.svelte      # Theme-reactive lighting
│   ├── stores/
│   │   └── theme.ts           # Writable store: light / dark / strangerThings
│   ├── data/
│   │   ├── projects.yaml      # Project card data (title, description, shapes)
│   │   ├── site.ts            # Site metadata constants
│   │   └── projects/          # 6 Markdown files with frontmatter
│   ├── types/
│   │   └── index.ts           # Shared TypeScript interfaces
│   └── utils/
│       └── gsap.ts            # GSAP/ScrollTrigger setup + scrollReveal action
├── routes/
│   ├── +layout.svelte         # Root layout (header + main + footer)
│   ├── +layout.ts             # prerender = true, trailingSlash = 'always'
│   ├── +page.svelte           # Home page (Hero, Projects, About)
│   ├── +page.ts               # Loads projects from YAML
│   ├── +error.svelte          # Error/404 page
│   └── projects/[slug]/
│       ├── +page.svelte       # Project detail template
│       └── +page.ts           # Loads markdown + frontmatter, lists entries
static/
├── fonts/                     # IBM Plex Sans (400-700) + Benguiat Bold
├── images/projects/           # 6 project screenshot PNGs
├── social/                    # Avatar images
├── cv.pdf, Logo.png, banner.png, favicon files, robots.txt, .nojekyll
```

## Themes

The site has three color themes that cycle on each toggle:

1. **Light** — default, uses `prefers-color-scheme` on first visit
2. **Dark** — dark background with teal/orange accents
3. **Stranger Things** — black/red palette, Benguiat font on headings, red glow text-shadow

Theme preference is saved to `localStorage` and applied via a `data-theme` attribute on `<html>`. All CSS variables (colors, gradients, 3D light colors) react to the active theme.

## Adding a New Project

1. Add a screenshot to `static/images/projects/your-project.png`

2. Add an entry to `src/lib/data/projects.yaml`:
   ```yaml
   - title: "Your Project"
     url: "https://github.com/you/project"
     preview: "/projects/your-project/"
     description: "Short description of the project."
     image: "/images/projects/your-project.png"
     shapes:
       - type: "circle"
         color: "blue"
         size: ["100px"]
         xOffset: ["-40px"]
         yOffset: ["-30px"]
         opacity: 1
   ```

3. Create `src/lib/data/projects/your-project.md`:
   ```md
   ---
   title: Your Project
   slug: your-project
   image: /images/projects/your-project.png
   genre: Genre
   stack: Engine / Language
   targetAudience: All ages
   controls: Keyboard+Mouse
   platform: PC
   ---

   ### Game Summary

   Description of the project goes here.
   ```

4. The project card will appear on the home page and the detail page at `/projects/your-project/` will be generated automatically during build.

## Deployment

### Automatic (GitHub Actions)

The repository includes a workflow at `.github/workflows/deploy.yml` that deploys on every push to `main`:

1. Checks out the code
2. Sets up Node.js 20 with npm cache
3. Runs `npm ci` and `npm run build`
4. Uploads the `build/` directory as a Pages artifact
5. Deploys to GitHub Pages

**Setup required in your GitHub repo settings:**

1. Go to **Settings → Pages**
2. Under **Source**, select **GitHub Actions**
3. Push to `main` — the workflow will trigger automatically

### Manual

If you want to deploy manually or to a different host, build the site and serve the `build/` directory as static files:

```sh
npm run build
```

The `build/` folder contains a fully self-contained static site. Upload it to any static hosting provider (Netlify, Vercel, Cloudflare Pages, S3, etc.).

## License

See [LICENSE](./LICENSE).
