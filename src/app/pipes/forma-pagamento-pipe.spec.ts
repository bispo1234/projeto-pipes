import { FormaPagamentoPipe } from './forma-pagamento-pipe';

describe('FormaPagamentoPipe (entra → sai)', () => {
  const pipe = new FormaPagamentoPipe();
  const tabela: [string | null | undefined, string][] = [
    ['pix', 'Pix'],
    ['credito', 'Cartão de crédito'],
    ['  CRÉDITO ', 'Cartão de crédito'],  // esquisita: acento, caixa e espaços
    ['', 'Não informado'],                // esquisita: vazio
    [undefined, 'Não informado'],         // esquisita: undefined
    ['cripto', 'Cripto'],                 // esquisita: código desconhecido
  ];

  tabela.forEach(([entra, sai]) =>
    it(`${JSON.stringify(entra)} → ${JSON.stringify(sai)}`, () => {
      expect(pipe.transform(entra)).toBe(sai);
    }),
  );
});
