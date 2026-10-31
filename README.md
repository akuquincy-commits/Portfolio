
# Professional Frontend Developer Portfolio

A polished, modern, responsive personal portfolio built with React and Vite.

## Features

- Clean editorial design with warm off-white background and deep green accent
- Fully responsive (mobile, tablet, desktop)
- Sections: Hero, Selected Work, Services, About, Working Process, Contact, Footer
- Accessible navigation with mobile menu
- Contact form with client-side validation and mailto fallback
- Editable configuration in `src/data/siteData.js`
- Semantic HTML, SEO meta tags, focus states, reduced-motion support

## Getting Started

```bash
cd portfolio
npm install
npm run dev
```

Open the local URL shown in the terminal (usually http://localhost:5173).

## Build for Production

```bash
npm run build
npm run preview
```

## Customisation

Edit **`src/data/siteData.js`** to update:

- Name, title, location, education
- Email, WhatsApp, LinkedIn, GitHub
- Availability label
- Project details, statuses and links
- Service descriptions
- About paragraphs

Replace project screenshots by setting the `image` field on each project object (place images in `public/` or `src/assets/`).

Update the favicon initials in `public/favicon.svg`.

## Tech Stack

- React 19
- Vite
- Plain CSS with design tokens (no Tailwind)
- No backend / no form service (mailto fallback)

## Notes

- Project live/GitHub links are placeholders (`#`) until real URLs are supplied.
- Do not invent employment history, clients or achievements.

# Portfolio
Personal portfolio showing some projects and contact details

