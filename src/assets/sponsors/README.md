# Sponsor logos

Drop sponsor logo image files here. They are auto-loaded by
`src/components/Sponsors.jsx` and matched by **filename** (without extension).

Accepted formats: `.png`, `.svg`, `.jpg`, `.jpeg`, `.webp`
(Transparent PNG or SVG looks best on the white tiles.)

## Files expected now

| Sponsor                | Filename to add        | Links to                        |
| ---------------------- | ---------------------- | ------------------------------- |
| MoneyPenny             | `moneypenny.*`         | https://www.moneypennyllc.com   |
| CPA Trendlines Academy | `cpa-trendlines.*`     | (no link yet)                   |

Until a matching image is added, the section shows a clean text tile with the
sponsor's name, so the layout always looks complete.

## Adding more sponsors later

1. Drop the logo image here (e.g. `acme.png`).
2. Add an entry to the `sponsors` array in `src/components/Sponsors.jsx`:
   `{ name: 'Acme', logo: 'acme', href: 'https://acme.com' }`
