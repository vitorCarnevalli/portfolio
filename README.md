# Portfólio — Vitor Carnevalli de Almeida

Site de portfólio pessoal — single-page React app com cena 3D interativa, dark mode, i18n PT/EN e animações.

## Stack

| Camada       | Tecnologia                                        |
|--------------|---------------------------------------------------|
| Framework    | React 19 + TypeScript                             |
| Build        | Vite 8                                            |
| Estilo       | Tailwind CSS 4                                    |
| Animações    | Framer Motion                                     |
| 3D           | Three.js + @react-three/fiber + @react-three/drei |
| Scroll suave | Lenis                                             |

## Funcionalidades

- **Hero 3D** — cena interativa com formas geométricas que respondem ao cursor (desktop only, lazy-loaded)
- **Dark / Light mode** — persistido em `localStorage`
- **i18n PT / EN** — troca instantânea, strings em `src/i18n/*.json`
- **Skills** — barras de progresso radiais em SVG animado
- **Experiência** — timeline animada por scroll
- **Projetos** — cards com efeito tilt 3D no hover
- **Cursor customizado** — desativado em mobile/touch
- Design responsivo (mobile-first)

## Início rápido

```bash
npm install
npm run dev   # http://localhost:5173
```

## Scripts

| Comando           | Descrição                                 |
|-------------------|-------------------------------------------|
| `npm run dev`     | Servidor de desenvolvimento               |
| `npm run build`   | Type-check + build de produção em `dist/` |
| `npm run lint`    | ESLint                                    |
| `npm run preview` | Serve o build de produção localmente      |

## Personalização

| O que mudar    | Onde                                             |
|----------------|--------------------------------------------------|
| Skills         | `src/data/skills.ts`                             |
| Projetos       | `src/data/projects.ts`                           |
| Textos (PT/EN) | `src/i18n/pt.json` e `src/i18n/en.json`          |
| Experiência    | array `items` em `src/components/Experience.tsx` |

## Estrutura

```
src/
├── App.tsx              Entrada — tema, idioma, layout
├── components/          Componentes de UI
├── hooks/               useTheme, useLanguage, useSmoothScroll
├── data/                skills.ts, projects.ts
├── i18n/                pt.json, en.json
└── assets/              Imagens e SVGs estáticos
public/
├── curriculo.pdf
├── favicon.svg
└── icons.svg
```
