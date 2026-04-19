# MatchMakers React Frontend

React + Vite application generated from the HTML source pages in `../frontend_html`.

## Project Structure

- `src/routes`: centralized paths, route config, and protected route logic
- `src/layouts`: authenticated and public layout wrappers
- `src/components/template`: reusable HTML template renderer
- `src/pages`: React page components for each source HTML page
- `src/store`: Redux Toolkit store and reusable slices
- `src/api`: global Axios instance with interceptors
- `src/config`, `src/constants`, `src/utils`: shared configuration and helpers

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```
