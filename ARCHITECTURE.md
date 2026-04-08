# Arquitetura — Portfolio

## Visão Geral

SPA estática sem backend. Toda a lógica roda no browser. O deploy é um conjunto de arquivos estáticos servidos pelo GitHub Pages.

```
Browser
  └── React SPA (index.html + JS bundle + assets)
        ├── App.tsx          — estado global (tema, idioma, scroll)
        ├── Componentes      — apresentação pura, recebem props
        ├── Hooks            — lógica reutilizável isolada
        └── i18n JSONs       — strings PT/EN carregadas em memória
```

---

## Stack e Decisões

| Tecnologia | Por quê |
|---|---|
| React 19 + TypeScript | Tipagem elimina bugs de runtime em props e chaves de i18n |
| Vite 8 | Build mais rápido que CRA/Webpack; tree-shaking nativo de ES modules |
| Tailwind CSS 4 | Utilitários inline evitam context-switching entre arquivos; purge automático no build |
| Framer Motion | API declarativa para animações com física (spring); `whileInView` com `once: true` é idiomático |
| Lenis | Scroll suave sem conflito com eventos nativos; expõe `lenis.stop()`/`lenis.start()` para modais |
| IBM Plex Sans + Syne | Sans legível em corpo pequeno; Syne é geométrica e funciona bem em headings grandes |

---

## Estrutura de Pastas

```
src/
├── App.tsx                  Único componente com estado global — tema, idioma, scroll
│
├── components/              Componentes de apresentação — recebem t(), theme, lang como props
│   ├── Navbar.tsx           Navegação fixa: scroll progress, IntersectionObserver, menu mobile
│   ├── Hero.tsx             Seção inicial: foto + texto + CTAs
│   ├── Skills.tsx           Grid de SkillCards + faixa de ferramentas
│   ├── SkillCard.tsx        Card individual com ícone Devicon e badge de nível
│   ├── Experience.tsx       Layout CV duas colunas (período | cargo + descrição)
│   ├── Projects.tsx         Grid de cards com modal e slider antes/depois
│   ├── Contact.tsx          Links de contato (email, LinkedIn, GitHub, WhatsApp)
│   ├── Footer.tsx           Copyright e stack
│   ├── BackgroundGrid.tsx   Grid de pontos fixo como textura de fundo
│   ├── CustomCursor.tsx     Cursor personalizado com mix-blend-difference (desktop only)
│   ├── MagneticButton.tsx   Efeito magnético no cursor para botões CTA
│   ├── Marquee.tsx          Faixa de rolagem infinita horizontal
│   └── TiltCard.tsx         Wrapper com inclinação 3D ao hover
│
├── hooks/
│   ├── useTheme.ts          Dark/light: lê prefers-color-scheme, persiste localStorage, aplica .dark no <html>
│   ├── useLanguage.ts       i18n: resolve chaves dot-notation, persiste localStorage, atualiza lang no <html>
│   └── useSmoothScroll.ts   Inicializa Lenis, expõe eventos lenis:stop/lenis:start para modais
│
├── data/
│   ├── skills.ts            Skill[] — name, level, color, icon (classe Devicon)
│   └── projects.ts          Project[] — nameKey, descriptionKey, tags, url, repo, coverImage, beforeImage
│
├── i18n/
│   ├── pt.json              Strings em português
│   └── en.json              Strings em inglês
│
└── index.css                Tailwind base + .glass utility + tema claro/escuro + prefers-reduced-motion

public/                      Arquivos servidos com URL estável (sem hash no build)
├── profile.jpeg             Foto do hero — referenciada via BASE_URL
├── curriculo.pdf            Download direto
├── og-image.png             Preview para compartilhamento (Open Graph / Twitter Card)
└── favicon.svg
```

---

## Fluxo de Dados

`App.tsx` é o único dono de estado global. Não há Context, Redux, Zustand ou qualquer store. Props são passadas diretamente para cada componente.

```
App.tsx
  useTheme()    → theme, toggleTheme
  useLanguage() → lang, toggleLang, t(), tArray()
  useSmoothScroll()

  ↓ props
  Navbar    (theme, toggleTheme, lang, toggleLang, t)
  Hero      (t)
  Skills    (t)
  Experience(t, tArray)
  Projects  (t)
  Contact   (t)
  Footer    (t)
```

`t(key)` resolve chaves dot-notation (`'skills.levels.intermediate'`) contra o JSON do idioma ativo. Retorna a própria chave como fallback se não encontrada — falha visível, sem exceção silenciosa.

---

## Internacionalização

Não usa biblioteca de i18n. O hook `useLanguage` carrega ambos os JSONs em memória na inicialização e seleciona o objeto correto pelo idioma ativo. Troca de idioma é instantânea — sem request de rede.

Ao alternar idioma:
1. `localStorage.setItem('lang', next)` — persiste entre sessões
2. `document.documentElement.lang` é atualizado — leitores de tela pronunciam corretamente

**Regra para novos textos:** toda chave nova deve existir em `pt.json` **e** `en.json`. O TypeScript não valida isso em compile-time — strings faltando retornam a própria chave como fallback.

---

## Dark Mode

`useTheme` aplica/remove a classe `.dark` no `<html>`. Tailwind usa `@custom-variant dark (&:where(.dark, .dark *))` em `index.css` para escopo correto com a variante `.dark *`.

Ao trocar tema:
1. Adiciona `.theme-transitioning` no `<html>` — CSS anima todas as propriedades de cor
2. `setTheme()` aplica a nova classe
3. Remove `.theme-transitioning` após 350ms

---

## Scroll Suave

Lenis é inicializado em `useSmoothScroll` via `requestAnimationFrame`. O RAF loop é cancelado no cleanup (`cancelAnimationFrame`) antes de `lenis.destroy()` para evitar leak.

Modais bloqueiam o scroll via eventos customizados:
```typescript
window.dispatchEvent(new Event('lenis:stop'))  // ao abrir modal
window.dispatchEvent(new Event('lenis:start')) // ao fechar modal
```

A Navbar usa `element.scrollIntoView({ behavior: 'smooth' })` em vez de `lenis.scrollTo()` — funciona independente do Lenis.

---

## Imagens

Todas as imagens de projetos estão em `src/assets/` no formato **WebP** e são importadas como módulos (Vite adiciona hash ao filename para cache-busting).

A foto do hero (`profile.jpeg`) e o og:image estão em `public/` com URL estável — referenciadas via `import.meta.env.BASE_URL`.

Cover images dos cards têm `loading="lazy"` (abaixo do fold). A foto do hero tem `fetchPriority="high"` (candidata ao LCP).

Para converter novas imagens para WebP:
```bash
npm install --save-dev sharp
node -e "require('sharp')('input.png').webp({ quality: 82 }).toFile('output.webp').then(console.log)"
npm uninstall sharp
```

---

## Deploy

Push na branch `main` dispara o workflow `.github/workflows/deploy.yml`:

1. Checkout + Node 22 + cache npm
2. `npm ci` — instala exatamente o lockfile
3. `npm audit --audit-level=high` — bloqueia o deploy se houver vulnerabilidade alta
4. `npm run build` — TypeScript + Vite
5. `peaceiris/actions-gh-pages@v4` publica `dist/` no branch `gh-pages`

O `base: '/portfolio/'` em `vite.config.ts` alinha com o subpath do GitHub Pages. Para hospedar na raiz de um domínio próprio, alterar para `base: '/'`.

---

## Decisões Relevantes

**Sem Context/store global**
O projeto tem dois estados globais (tema e idioma). Prop drilling para 7 componentes é simples de rastrear. Context adicionaria indireção sem benefício real nessa escala.

**i18n sem biblioteca**
`react-i18next` e similares adicionam ~10KB gzip para resolver dot-notation e fallback — funcionalidade que cabe em ~30 linhas de hook. O custo de dependência não compensa para dois idiomas com JSONs pequenos.

**Sem suite de testes automatizados**
A lógica crítica (hooks `useTheme` e `useLanguage`) é testável, mas o ROI de montar uma suite completa para um site estático de portfolio é baixo. O TypeScript cobre erros de tipo em compile-time; o build de produção valida o resultado final.

**Three.js removido**
Dependências `@react-three/fiber`, `@react-three/drei` e `three` foram removidas após o componente `HeroBackground.tsx` ser descontinuado. Redução de ~56 pacotes no lockfile.
