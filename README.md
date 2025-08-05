# Mashoor Frontend Developer Test – Product Landing Page

This repository contains a proof‑of‑concept product landing page built with **Next.js 15** and modern web tooling.  The goal of the assignment was to demonstrate how to scaffold a production‑ready application using the latest version of Next.js (released on 21 October 2024【260570709629000†L14-L24】) while implementing a clean architecture and best practices such as SSR/SSG rendering, multilingual support, global state management with Redux Toolkit, responsive design with Tailwind CSS, accessibility, SEO enhancements and testing.

## ✨ Features

The application implements many of the requirements specified in the test brief:

- **Next.js 15**: built using the new app router with support for asynchronous request APIs, typed routes and improved caching semantics【260570709629000†L14-L63】.  The project is configured in `next.config.mjs` to enable experimental features and to provide localisation via the built‑in `i18n` option.
- **TypeScript** everywhere: all components, hooks and store definitions are strictly typed.
- **Tailwind CSS**: utility‑first CSS is used for layout, spacing, typography and dark mode.  The `globals.css` file imports Tailwind’s base, components and utilities layers.
- **shadcn/ui**: the design system uses the shadcn collection of accessible UI primitives as a base for atoms and molecules.  Examples include buttons, cards and the responsive navigation menu.
- **Redux Toolkit**: a lightweight global store is configured in `src/store/index.ts` with a `favoritesSlice`.  Users can add or remove products from a favourites list and the state persists across pages.
- **Framer Motion**: subtle animations are used throughout the UI.  For example, product cards scale slightly on hover to provide a tactile feel.
- **Multilingual support**: both English (`/en`) and Turkish (`/tr`) versions of every page are available.  Translation strings live under `src/locales/` and a small hook (`useTranslation`) selects the correct language based on the URL segment.
- **Mock data**: the `data/` folder contains JSON definitions for products and categories.  A helper in `src/lib/data.ts` reads the files and exposes typed functions such as `getProducts()` and `getProductBySlug()`.
- **SEO & structured data**: each page exports a `generateMetadata` function to populate the HTML `<head>` with dynamic title, description and social meta tags (Open Graph and Twitter).  Product pages embed [Schema.org](https://schema.org) `Product` JSON‑LD to improve search engine understanding.  A dynamic `sitemap.xml` and `robots.txt` are served from API route handlers.
- **Error handling**: dedicated `not-found.tsx` and `error.tsx` components provide friendly 404 and 500 pages.
- **Testing**: a Jest configuration is included along with React Testing Library.  The `__tests__/Home.test.tsx` file shows how to render the home page and make assertions on its output.
- **Linting & formatting**: ESLint (with the `eslint-config-next` preset) and Prettier enforce a consistent code style.

### Optional extras

While not required, the codebase also demonstrates how to implement:

- **Dark mode**: a `ThemeToggle` component persists the current theme in `localStorage` and toggles a `dark` class on the `<html>` element.  Tailwind's dark variants adjust colours automatically.
- **Atomic Design**: the `src/components` directory follows the atomic methodology (atoms, molecules, organisms, templates) to encourage reusable and composable UI building blocks.

## 🏗️ Project structure

```
mashoor-landing/
├── data/                     # Mock JSON data for products and categories
├── public/                   # Public assets, robots.txt, etc.
├── src/
│   ├── app/                  # Next.js app router
│   │   ├── [locale]/         # Dynamic locale segment (/en, /tr)
│   │   │   ├── product/[slug]/page.tsx   # Product details pages
│   │   │   ├── favorites/page.tsx        # Favourites list
│   │   │   └── page.tsx                  # Home page
│   │   ├── api/
│   │   │   ├── sitemap.xml/route.ts      # Generates dynamic sitemap
│   │   │   └── robots.txt/route.ts       # Returns robots rules
│   │   ├── error.tsx                     # 500 error page
│   │   └── not-found.tsx                 # 404 page
│   ├── components/
│   │   ├── atoms/                        # Basic UI elements (Button, Card, ThemeToggle)
│   │   ├── molecules/                    # Compositions of atoms (ProductCard)
│   │   ├── organisms/                    # Page sections (Hero, Header, Footer)
│   │   ├── providers/                    # React providers (Redux store wrapper)
│   │   └── hooks/                        # Custom hooks (useTranslation, useFavorites)
│   ├── lib/                              # Utility functions (data fetching)
│   ├── locales/                          # Language dictionaries
│   ├── store/                            # Redux slices and store configuration
│   └── types/                            # TypeScript interfaces
├── .eslintrc.js
├── jest.config.js
├── next.config.mjs
├── postcss.config.js
├── tailwind.config.cjs
├── tsconfig.json
├── .prettierrc
└── README.md
```

## 🚀 Getting started

> **Note**: Because this repository only contains source code, you need to run the standard Next.js installation steps yourself.  When you clone or download the project, run the following commands from the root folder:

```bash
# Install dependencies
npm install

# Start the development server on http://localhost:3000
npm run dev

# Build for production
npm run build
npm start

# Run tests
npm test
```

By default the site is available at `http://localhost:3000/en`.  To switch to Turkish, visit `http://localhost:3000/tr`.  You can add or remove products from your favourites list on any page.

## 🧠 Architecture notes

This project embraces composability and separation of concerns:

* **Atomic Design** structures components from small units (buttons) up to full sections (hero banners).  This makes it easy to reuse and extend pieces of the UI.
* **Next.js App Router** enables per‑route data fetching and dynamic metadata.  Routes are defined by folder names, and components in the `app` directory are automatically code split.
* **Redux Toolkit** provides a single source of truth for cross‑cutting state (favourites).  All reducers live under `src/store`, and the `Providers` component wraps the application to expose the store.
* **Internationalisation** is achieved by reading the locale from the URL and selecting the corresponding JSON dictionary.  The `useTranslation` hook returns a `t()` function that looks up keys; untranslated keys fall back to the key itself.
* **Error and fallback pages** are implemented with the built‑in `not-found.tsx` and `error.tsx` files.  When a slug does not exist, the user is shown a 404 screen; unexpected runtime errors surface a generic 500 page.
* **Sitemap and robots** are generated dynamically at runtime from the same mock data used to build the pages.  This ensures search engines index all published products.

## 📢 Contributing

If you wish to extend this project, feel free to fork it and make it your own.  The mock data in `data/` can be replaced with real API calls to `https://api.calvero.club` once those endpoints become available.  Please ensure any new features maintain TypeScript safety, respect the existing architecture and abide by ESLint/Prettier rules.

---

This assignment was completed as part of a frontend developer test.  It demonstrates how to structure a Next.js 15 application with modern tooling while paying attention to performance, accessibility and developer experience.