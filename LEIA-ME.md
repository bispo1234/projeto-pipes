# Atividade: a agenda passa a falar português (Angular · Pipes)

## Como rodar
```bash
npm install
npm start        # http://localhost:4200
npm test         # roda os testes dos pipes (tabela "entra → sai")
```

## Onde está cada passo
1. **pt-BR**: `src/app/app.config.ts` (`registerLocaleData`, `LOCALE_ID`, `DEFAULT_CURRENCY_CODE`)
2. **Pipes prontos** (date, currency, percent, number, uppercase, titlecase): lista de eventos em `src/app/app.html`
3. **Quatro pipes**: `src/app/pipes/` → `telefone`, `formaPagamento`, `iniciais`, `diasPara`
4. **Pipes na lista de participantes**: `src/app/app.html`
5. **Tabela da folha** (entra → sai, incluindo entradas esquisitas): arquivos `*.spec.ts` ao lado de cada pipe
