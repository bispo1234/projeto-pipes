import { Pipe, PipeTransform } from '@angular/core';

const ROTULOS: Record<string, string> = {
  pix: 'Pix',
  credito: 'Cartão de crédito',
  debito: 'Cartão de débito',
  boleto: 'Boleto',
  dinheiro: 'Dinheiro',
  transferencia: 'Transferência',
};

/**
 * Converte o código da forma de pagamento em texto amigável.
 *  'credito'  -> 'Cartão de crédito'
 *  ' PIX '    -> 'Pix'
 *  'crédito'  -> 'Cartão de crédito' (ignora acento e caixa)
 *  vazio/null -> 'Não informado'
 *  desconhecido ('cripto') -> 'Cripto' (capitaliza, não quebra)
 */
@Pipe({ name: 'formaPagamento' })
export class FormaPagamentoPipe implements PipeTransform {
  transform(codigo: string | null | undefined): string {
    const texto = (codigo ?? '').trim();
    if (!texto) return 'Não informado';

    const chave = texto
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    return ROTULOS[chave] ?? texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
  }
}
