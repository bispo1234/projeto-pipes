import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formata telefone brasileiro.
 *  71988887777    -> (71) 98888-7777
 *  7133334444     -> (71) 3333-4444
 *  988887777      -> 98888-7777
 *  +55 71 98888-7777 -> (71) 98888-7777
 *  vazio/null     -> —
 *  formato inválido -> devolve o original, sem quebrar
 */
@Pipe({ name: 'telefone' })
export class TelefonePipe implements PipeTransform {
  transform(valor: string | number | null | undefined): string {
    if (valor === null || valor === undefined) return '—';

    const original = String(valor).trim();
    let digitos = original.replace(/\D/g, '');
    if (!digitos) return '—';

    // remove o código do país (55) quando vier com DDD
    if ((digitos.length === 12 || digitos.length === 13) && digitos.startsWith('55')) {
      digitos = digitos.slice(2);
    }

    switch (digitos.length) {
      case 11:
        return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
      case 10:
        return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
      case 9:
        return `${digitos.slice(0, 5)}-${digitos.slice(5)}`;
      case 8:
        return `${digitos.slice(0, 4)}-${digitos.slice(4)}`;
      default:
        return original;
    }
  }
}
