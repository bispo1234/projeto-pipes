import { TelefonePipe } from './telefone-pipe';

describe('TelefonePipe (entra → sai)', () => {
  const pipe = new TelefonePipe();
  const tabela: [string | number | null | undefined, string][] = [
    ['71988887777', '(71) 98888-7777'],      // celular com DDD
    ['7133334444', '(71) 3333-4444'],        // fixo com DDD
    ['+55 (71) 98888-7777', '(71) 98888-7777'], // com +55 e símbolos
    ['988887777', '98888-7777'],             // sem DDD
    ['', '—'],                               // esquisita: vazio
    [null, '—'],                             // esquisita: null
    ['123', '123'],                          // esquisita: formato errado, não quebra
  ];

  tabela.forEach(([entra, sai]) =>
    it(`${JSON.stringify(entra)} → ${JSON.stringify(sai)}`, () => {
      expect(pipe.transform(entra)).toBe(sai);
    }),
  );
});
