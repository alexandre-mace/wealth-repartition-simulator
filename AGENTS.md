# wealth

Visualisation de la répartition des richesses.

## Commandes

- `pnpm dev` développement
- `pnpm build` build de production, et c'est le contrôle : il type-check et échoue sur une erreur de compilation
- `pnpm lint`\n- `pnpm data` régénère les données depuis `scripts/build-data.mjs`. Les données sont cuites au build, jamais fetchées à la volée.

## Stack

Next 16 en App Router, React 19, TypeScript strict, Tailwind 4, shadcn sur base Base UI.

Conventions de la stack : `docs/next-guidelines.md` et `docs/react-guidelines.md`, liens vers [dev-standards](https://github.com/alexandre-mace/dev-standards).
