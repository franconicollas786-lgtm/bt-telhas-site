# BTTelhas

Site institucional B2B (catálogo, orçamento via WhatsApp, páginas legais) — atacado de telhas, forros e rodapés.

## Rotas

| Caminho | Conteúdo |
| -------- | -------- |
| `/` | Página inicial (hero, catálogo, formulário) |
| `/privacidade` | Política de privacidade |
| `/termos` | Termos de uso |
| `*` | Página 404 (dentro do app) |

SEO por rota via `react-helmet-async`. Metadados padrão também estão em `index.html` para a primeira carga.

## Pré-requisitos

- [Node.js](https://nodejs.org/) 18 ou superior (recomendado: LTS atual)

## Desenvolvimento

```bash
npm install
npm run dev
```

O app sobe em `http://localhost:3000` (porta definida no script `dev`).

## Build para produção

```bash
npm run build
```

Gera `dist/`, copia `index.html` para `dist/404.html` (fallback útil em GitHub Pages) e inclui `public/` (favicon, `robots.txt`, `sitemap.xml`).

Testar o build localmente:

```bash
npm run preview
```

## Scripts

| Script | Descrição |
| ------ | --------- |
| `npm run dev` | Servidor de desenvolvimento (Vite) |
| `npm run build` | Gera `dist/` para deploy |
| `npm run preview` | Serve o conteúdo de `dist/` |
| `npm run lint` | Verificação TypeScript (`tsc`) |
| `npm run clean` | Remove a pasta `dist/` |

## Configuração do negócio

Edite `src/site.ts` para domínio canônico (`SITE_URL`), links de redes sociais e telefone/WhatsApp usados no site.

## Deploy

- **Netlify / Vercel**: arquivos `netlify.toml` e `vercel.json` já configuram rewrites de SPA (`/*` → `index.html`).
- **Qualquer servidor estático**: sirva a pasta `dist/` e garanta que todas as rotas caiam em `index.html` (exceto arquivos reais como `/favicon.svg`).
- **GitHub Pages (projeto em subpasta)**: pode ser necessário definir `base` em `vite.config.ts` e ajustar `SITE_URL` em `src/site.ts`.
