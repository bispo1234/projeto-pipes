import { IniciaisPipe } from './iniciais-pipe';

describe('IniciaisPipe (entra → sai)', () => {
  const pipe = new IniciaisPipe();
  const tabela: [string | null | undefined, string][] = [
    ['Maria da Silva Santos', 'MS'],
    ['ana', 'A'],                      // nome único
    ['  joão   pedro  ', 'JP'],        // esquisita: espaços sobrando
    ['', '?'],                         // esquisita: vazio
    [null, '?'],                       // esquisita: null
    ['de da', '?'],                    // esquisita: só conectivos
  ];

  tabela.forEach(([entra, sai]) =>
    it(`${JSON.stringify(entra)} → ${JSON.stringify(sai)}`, () => {
      expect(pipe.transform(entra)).toBe(sai);
    }),
  );

  it('respeita o limite de letras', () => {
    expect(pipe.transform('Maria da Silva Santos', 1)).toBe('M');
  });
});
