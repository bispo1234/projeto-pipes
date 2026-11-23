import { DiasParaPipe } from './dias-para-pipe';

describe('DiasParaPipe (entra → sai)', () => {
  const pipe = new DiasParaPipe();
  const hoje = new Date(2026, 10, 23); // 23/11/2026

  const tabela: [Date | string | null | undefined, string][] = [
    ['2026-11-23', 'hoje'],
    ['2026-11-24', 'amanhã'],
    ['2026-11-28', 'em 5 dias'],
    ['2026-11-22', 'ontem'],
    ['2026-11-20', 'há 3 dias'],
    [new Date(2026, 10, 23, 23, 59), 'hoje'],  // esquisita: fim do dia ainda é hoje
    ['', ''],                                  // esquisita: vazio
    [null, ''],                                // esquisita: null
    ['abc', ''],                               // esquisita: data inválida
  ];

  tabela.forEach(([entra, sai]) =>
    it(`${JSON.stringify(entra)} → ${JSON.stringify(sai)}`, () => {
      expect(pipe.transform(entra, hoje)).toBe(sai);
    }),
  );
});
