# Redesign — Seção de Projetos

**Data:** 2026-04-03  
**Status:** Aprovado

## Objetivo

Substituir o grid de cards genérico da seção de Projetos por uma lista editorial com divisórias horizontais. O design atual parece template de IA; o novo deve parecer artesanal e coerente com o estilo newspaper do restante do site.

## Layout Geral

- Header padrão: título grande + subtítulo muted (sem alteração)
- Uma `border-t` fina acima do primeiro item marca o início da lista
- Cada projeto é uma faixa horizontal separada por `border-b` fina
- Card "em breve" como última entrada, com `opacity-40`

## Anatomia de Cada Linha (desktop)

Grid de 3 colunas:

| Coluna | Conteúdo | Estilo |
|--------|----------|--------|
| Esquerda | Nome do projeto | `text-2xl`, font-heading, negrito. Hover → `#0066FF` |
| Centro | Tags | font-mono pequeno, cor muted, sem borda, separadas por espaço |
| Direita | Botões "Ver projeto ↗" e "Repositório ↗" | font-mono pequeno, alinhados à direita, hover → sublinhado azul |

No mobile: empilha verticalmente (nome → tags → botões).

## Animações e Interações

- Entrada: `opacity: 0→1` + `y: 16→0`, stagger `delay: index * 0.08`, `whileInView` com `once: true`
- Hover na linha: `border-b` fica `#0066FF`
- Nome: muda para `#0066FF` no hover
- Sem tilt, sombra, blur ou qualquer efeito ornamental

## Conteúdo

- 1 projeto real: Portfólio Pessoal (repo apenas, sem `url`)
- 1 entrada "em breve" ao final

## Arquivos Afetados

- `src/components/Projects.tsx` — reescrever o componente inteiro
- `src/data/projects.ts` — sem alteração
- `src/i18n/pt.json` e `en.json` — sem alteração de keys
