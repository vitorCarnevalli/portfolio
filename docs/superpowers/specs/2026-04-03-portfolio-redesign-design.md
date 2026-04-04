# Spec: Redesign do Portfólio

**Data:** 2026-04-03  
**Abordagem:** Cirúrgica — editar componentes existentes no lugar, sem criar arquivos desnecessários.

---

## Paleta de Cores

Remove completamente o azul elétrico `#0066FF`. A paleta passa a ser:

| Token | Claro | Escuro |
|---|---|---|
| Fundo | `#FAFAF8` | `#0A0A0A` |
| Texto primário | `#0A0A0A` | `#F0EFE9` |
| Texto muted | `#6B6B6B` | `#888888` |
| Borda | `#E5E5E0` | `#1E1E1E` |
| Superfície (cards) | `#FFFFFF` | `#111111` |
| Texto muito muted | `#AAAAAA` | `#555555` |

Todos os usos de `#0066FF` (active nav, hovers, badges, linhas decorativas) são substituídos por `#0A0A0A` no modo claro e `#F0EFE9` no modo escuro.

---

## Seção 1 — Toggle Neumórfico (Navbar)

**Arquivo:** `src/components/Navbar.tsx`

### O que muda
O botão de tema atual (`w-9 h-9`, borda fina, ícone SVG) é substituído por um componente `NeumorphicToggle` inline no Navbar — não vira arquivo separado.

### Visual
- Pílula de `52×28px` com círculo interno deslizante de `20×20px`
- Ícone ☀️ (sol) ou 🌙 (lua) dentro do círculo, `text-xs`

**Modo claro:**
```css
background: #E0E0E0;
box-shadow: 4px 4px 8px #BEBEBE, -4px -4px 8px #FFFFFF;
/* círculo */
box-shadow: 2px 2px 5px #BEBEBE, -2px -2px 5px #FFFFFF;
```

**Modo escuro:**
```css
background: #1E1E1E;
box-shadow: 4px 4px 8px #0A0A0A, -4px -4px 8px #2A2A2A;
/* círculo */
box-shadow: 2px 2px 5px #0A0A0A, -2px -2px 5px #2A2A2A;
```

### Animação
`motion.div` com `layout` no círculo — Framer Motion gerencia o deslize ao trocar tema. Sem `transition` CSS manual.

### Responsivo
Substitui o botão de tema em **ambos** os lugares onde ele aparece hoje: desktop (linha 132) e mobile (linha 149).

---

## Seção 2 — Skills (cards sem barra)

**Arquivos:** `src/components/SkillCard.tsx`, `src/data/skills.ts`

### O que muda no SkillCard
Remove o bloco de progresso inteiro (linhas 59–74 do arquivo atual):
- A `div` com `h-1.5` (barra)
- O `motion.div` animado
- O `span` com percentual

O card fica com apenas 3 elementos:
1. Ícone da tecnologia + badge de nível (linha do header)
2. Nome da skill

### Badge de nível
Mantém o estilo atual mas substitui a cor de destaque pelo esquema B&W:
```tsx
style={{ 
  backgroundColor: 'rgba(10,10,10,0.06)',  // light
  color: '#0A0A0A'                          // light
  // dark: bg rgba(240,239,233,0.08), color #F0EFE9
}}
```

### O que muda em skills.ts
- Remove `levelPercentage` (não tem mais uso)
- Mantém campo `color` na interface — ainda usado para a borda esquerda do card e watermark icon

### Borda esquerda do card
A `borderLeft: 3px solid skill.color` é mantida pois dá personalidade ao card sem depender do azul.

---

## Seção 3 — Experience (layout CV)

**Arquivo:** `src/components/Experience.tsx`

### Estrutura por item
Grid de duas colunas: `grid-cols-[180px_1fr]`

```
Coluna esquerda (fixa 180px):   Coluna direita (flex):
─────────────────────────────   ──────────────────────────────────────
2023 – presente                 Suporte em TI
UNICAMP (FEF)                   Descrição do cargo em texto corrido...

                                [ tag ]  [ tag ]  [ tag ]
```

**Coluna esquerda:**
- Período: `text-xs font-mono text-[#6B6B6B] dark:text-[#888]`
- Organização: `text-xs font-mono text-[#6B6B6B] dark:text-[#888] font-semibold mt-1`

**Coluna direita:**
- Cargo: `text-2xl font-bold font-heading text-[#0A0A0A] dark:text-[#F0EFE9]`
- Descrição: `text-base text-[#6B6B6B] dark:text-[#888] leading-relaxed mt-2`
- Tags: mesmo estilo atual — `text-xs font-mono border px-2.5 py-1`

### Separador entre itens
`h-px bg-[#E5E5E0] dark:bg-[#1E1E1E]` full-width entre cada item. Linha superior antes do primeiro item também.

### Responsivo
Abaixo de `md`: colunas empilham. Período + org viram header do bloco (`mb-1`), cargo e descrição abaixo normalmente.

### Animação
`whileInView` com `opacity: 0 → 1` + `y: 24 → 0`, `once: true`, delay escalonado por índice.

---

## Seção 4 — Projects (grid + modal)

**Arquivos:** `src/components/Projects.tsx`, `src/data/projects.ts`

### Grid
`grid grid-cols-1 md:grid-cols-3 gap-6` — 3 colunas no desktop, 1 no mobile.

### Estrutura de cada card
```
┌──────────────────────────────┐
│                              │
│   placeholder (gradiente)    │  altura: 160px
│                              │
├──────────────────────────────┤
│  Nome do Projeto             │  font-heading, bold
│  [ React ] [ TS ] [ Vite ]   │  tags de linguagem
│                              │
│  [ Acessar Site ] [ Repo ]   │  botões inline
└──────────────────────────────┘
```

**Placeholder de imagem:** `div` com gradiente gerado a partir do campo `coverGradient` do projeto. Quando não definido, usa cinza neutro `#E5E5E0 → #C8C8C8`. Quando tiver screenshot real, troca por `<img>`.

**Tags:** pílulas `text-xs font-mono border border-[#E5E5E0] px-2 py-0.5` — sem cor de destaque.

**Botões:** pequenos, `text-xs`, borda fina, lado a lado. Renderiza apenas se `url` / `repo` existir. Clique nos botões usa `e.stopPropagation()` para não abrir o modal.

### Card GitHub (3º card fixo)
- Placeholder cinza com ícone do GitHub centralizado (SVG inline, `w-10 h-10`)
- Título: "GitHub"
- Subtítulo muted: "Ver todos os repositórios"
- Botão único: "Ver GitHub ↗" → abre `https://github.com/vitorCarnevalli` em nova aba
- Não abre modal

### Modal
Ativado ao clicar em qualquer parte do card (exceto nos botões e exceto no card GitHub).

**Overlay:** `fixed inset-0 bg-black/60 backdrop-blur-sm z-50`

**Painel:**
- `max-w-lg w-full mx-auto mt-24` centralizado
- Fundo: `bg-[#FAFAF8] dark:bg-[#111111]`
- Borda: `border border-[#E5E5E0] dark:border-[#1E1E1E]`
- Padding: `p-8`
- Conteúdo: título, descrição completa (`t(project.descriptionKey)`), tags, botões

**Fechar:** clique no overlay ou tecla ESC (`useEffect` com `keydown`).

**Animação:** `AnimatePresence` + `motion.div` com `initial={{ opacity: 0, scale: 0.96 }}` → `animate={{ opacity: 1, scale: 1 }}`.

### Mudanças em projects.ts
Adiciona campo opcional:
```ts
coverGradient?: [string, string]  // par de cores hex: [de, para]
// ex: ['#1a1a2e', '#16213e']
// fallback quando ausente: ['#E5E5E0', '#C8C8C8'] (cinza neutro)
```

A interface `Project` recebe este campo. Projetos existentes não precisam definir (usa fallback automaticamente).

---

## Arquivos modificados

| Arquivo | Tipo de mudança |
|---|---|
| `src/components/Navbar.tsx` | Substituir botão de tema por toggle neumórfico; trocar todas as ocorrências de `#0066FF` |
| `src/components/SkillCard.tsx` | Remover bloco de progresso; ajustar cores do badge |
| `src/components/Skills.tsx` | Trocar ocorrências de `#0066FF` |
| `src/components/Experience.tsx` | Reescrever layout completo para estilo CV |
| `src/components/Projects.tsx` | Reescrever para grid + modal; adicionar card GitHub |
| `src/data/skills.ts` | Remover `levelPercentage` |
| `src/data/projects.ts` | Adicionar campo `coverGradient` à interface |
| `src/i18n/pt.json` | Sem mudança (strings existentes são suficientes) |
| `src/i18n/en.json` | Sem mudança |
