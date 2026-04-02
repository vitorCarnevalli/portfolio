# Portfólio — Vitor Carnevalli de Almeida

Site de portfólio pessoal construído com React 19, Vite 8, Tailwind CSS 4 e TypeScript.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Estilo | Tailwind CSS 4 |
| Animações | Framer Motion |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Scroll suave | Lenis |

## Funcionalidades

- Hero com cena 3D interativa (formas geométricas que seguem o cursor)
- Dark / Light mode com persistência em `localStorage`
- i18n PT / EN
- Scroll suave (Lenis)
- Cursor customizado (desativado em mobile/touch)
- Skills com progresso radial em SVG animado
- Timeline de experiência com animação por scroll
- Cards de projetos com efeito tilt 3D no hover
- Design responsivo (mobile-first)

## Começando

```bash
npm install
npm run dev       # http://localhost:5173
```

## Scripts

```bash
npm run dev       # Servidor de desenvolvimento
npm run build     # Type-check + build de produção (dist/)
npm run lint      # ESLint
npm run preview   # Servir o build de produção localmente
```

## Estrutura

```
src/
├── components/   # Componentes de UI
├── hooks/        # useTheme, useLanguage, useSmoothScroll
├── data/         # skills.ts, projects.ts
├── i18n/         # pt.json, en.json
└── assets/       # Imagens e SVGs estáticos
public/
├── curriculo.pdf
├── favicon.svg
└── icons.svg
```

## Personalização

- **Skills**: editar `src/data/skills.ts`
- **Projetos**: editar `src/data/projects.ts`
- **Textos**: editar `src/i18n/pt.json` e `src/i18n/en.json`
- **Experiência**: editar o array `items` em `src/components/Experience.tsx`
