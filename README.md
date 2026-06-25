# Clube do Autor — LIBRIX HUB

Landing page de vendas do Clube do Autor LIBRIX HUB, construída com Next.js 14 (App Router), TypeScript e Tailwind CSS.

## Como rodar localmente

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Como fazer deploy na Vercel

1. Faça push deste repositório para o GitHub.
2. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório.
3. **Nenhuma variável de ambiente é necessária.**
4. Clique em **Deploy** — pronto.

## Tecnologias

- **Next.js 14** com App Router
- **TypeScript** — tipagem completa
- **Tailwind CSS** com paleta de design customizada (sem cores padrão)
- **Fontes via `next/font/google`**:
  - [Fraunces](https://fonts.google.com/specimen/Fraunces) — títulos
  - [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3) — corpo
  - [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — preços e rótulos

## Estrutura

```
app/
  layout.tsx     — Root layout: fontes, metadata, SEO
  page.tsx       — Página principal (composição das seções)
  globals.css    — Tailwind base + prefers-reduced-motion + :focus-visible
components/
  Navbar.tsx     — Barra de navegação fixa com CTA para WhatsApp
  Hero.tsx       — Hero com headline, CTAs e estante de livros
  Bookshelf.tsx  — Elemento assinatura: lombadas com hover (translateY)
  Benefits.tsx   — Grid 2 colunas com os 6 benefícios do clube
  Pricing.tsx    — Card estilo carimbo com plano mensal e anual
  Footer.tsx     — CTA final + contato
```
