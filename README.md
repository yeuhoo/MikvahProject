# Mikvah Project

A responsive community homepage built with **Next.js, React, and Tailwind CSS**, using the Next.js App Router.

## Development

With Node.js 22.12+ installed:

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4173. Changes refresh automatically.

## Production

```sh
npm run build
npm start
```

Deploy with a Next.js-compatible host. Use `npm ci` for reproducible dependency installation.

## Project structure

- `app/page.jsx`: React homepage, calendar dates, location controls, and search feedback
- `app/layout.jsx`: shared layout and page metadata
- `app/globals.css`: Tailwind import and the homepage's custom styles
- `app/icon.svg`: site icon
- `postcss.config.mjs`: Tailwind PostCSS configuration

The homepage takes inspiration from [Catskills Eruv](https://www.catskillseruv.com/); no affiliation is claimed. The working name and visitor details are provisional. Minyan search is not connected to a live directory. Confirm contact details, location, hours, and visitor guidance before launch.
