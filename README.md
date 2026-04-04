# Portfólio — Vitor Carnevalli de Almeida

Site de portfólio pessoal — single-page React app com design editorial preto e branco, cena 3D interativa, dark mode com toggle neumórfico e i18n PT/EN.

🌐 **[vitorcarnevalli.github.io/portfolio](https://vitorcarnevalli.github.io/portfolio)**

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 8 |
| Estilo | Tailwind CSS 4 |
| Animações | Framer Motion |
| 3D | Three.js + @react-three/fiber + @react-three/drei |
| Scroll suave | Lenis |

## Funcionalidades

- **Hero 3D** — cena interativa com formas geométricas que respondem ao cursor (desktop, lazy-loaded)
- **Toggle neumórfico** — dark/light mode com pílula e sombras suaves, persistido em `localStorage`
- **i18n PT / EN** — troca instantânea via toggle, strings em `src/i18n/*.json`
- **Skills** — cards com ícone + badge de nível, paleta preto e branco
- **Experiência** — layout estilo CV duas colunas (período + cargo)
- **Projetos** — grid com cards, placeholder de capa, modal de detalhes e card do GitHub
- **Contato** — seção dedicada com links para Email, LinkedIn, GitHub e WhatsApp
- **Cursor customizado** — desativado em mobile/touch
- Design responsivo mobile-first

## Início rápido

```bash
npm install
npm run dev   # http://localhost:5173
```

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Type-check + build de produção em `dist/` |
| `npm run lint` | ESLint |
| `npm run preview` | Serve o build de produção localmente |

## Personalização

| O que mudar | Onde |
|---|---|
| Skills e ferramentas | `src/data/skills.ts` |
| Projetos | `src/data/projects.ts` |
| Textos PT | `src/i18n/pt.json` |
| Textos EN | `src/i18n/en.json` |
| Experiência | array `items` em `src/components/Experience.tsx` |

## Estrutura

```
src/
├── App.tsx                 Entrada — tema, idioma, layout
├── components/
│   ├── Navbar.tsx          Navegação fixa com toggles neumórficos
│   ├── Hero.tsx            Layout split com cena 3D
│   ├── Skills.tsx          Grid de skills + ferramentas
│   ├── Experience.tsx      Layout CV duas colunas
│   ├── Projects.tsx        Grid de cards com modal
│   ├── Contact.tsx         Links de contato
│   └── Footer.tsx          Copyright
├── hooks/
│   ├── useTheme.ts         Dark/light mode
│   ├── useLanguage.ts      i18n PT/EN
│   └── useSmoothScroll.ts  Lenis
├── data/
│   ├── skills.ts           Lista de habilidades
│   └── projects.ts         Lista de projetos
└── i18n/
    ├── pt.json
    └── en.json
public/
├── profile.jpeg
├── curriculo.pdf
└── favicon.svg
```

## Deploy

O site é publicado automaticamente no GitHub Pages a cada push na branch `main` via GitHub Actions.
