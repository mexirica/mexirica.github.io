# Rodrigo Mecheri

Source for [mexirica.github.io](https://mexirica.github.io), a portfolio and technical blog focused on Go, developer tooling, and systems infrastructure.

## Stack

- Astro 7 and TypeScript
- Content collections with Markdown and MDX
- Pagefind static search
- Satori and Sharp for generated social images
- GitHub Pages deployment

## Development

Requires Node.js 22.12 or newer.

```sh
npm install
npm run dev
```

Before opening a pull request:

```sh
npm run format:check
npm run check
npm run build
```

The production build is written to `dist/`; the build script also generates the Pagefind index.

## Content

- Project studies live in `src/content/works/`.
- Articles live in `src/content/blog/`.
- Site identity, navigation, and social profiles live in `src/consts.ts`.
- Shared UI copy lives in `src/i18n/`.

## License

See [LICENSE](./LICENSE).
