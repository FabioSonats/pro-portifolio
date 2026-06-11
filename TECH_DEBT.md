# Débitos técnicos

Lista de pendências conhecidas que não bloqueiam o uso, mas devem ser resolvidas.

## Domínio antigo `fabiohenrique.dev`

Há referências ao domínio `fabiohenrique.dev` que precisam ser eliminadas.

- `src/data/portfolioData.ts` → campo `contact.website` usa `fabiohenrique.dev`.
- A função de chat (`supabase/functions/chat/index.ts`) cita `fabiosonats.github.io` no system prompt, divergindo do website acima (duas fontes de verdade para contato/site).

**Ação:** decidir o domínio oficial único, atualizar `portfolioData.ts` e o system prompt do chat para a mesma fonte, e remover qualquer menção a `fabiohenrique.dev`.

## Chat da IA (mapeado, não resolvido)

- Sem histórico de conversa: cada mensagem é stateless (a edge function só recebe `message` + `portfolioData`).
- Responde sempre em português mesmo no modo inglês (instrução nº1 do system prompt força pt-BR).
- O blog (Supabase) não alimenta o chat.
- Edge function sem rate limit / auth (CORS `*`).
