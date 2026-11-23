import { Pipe, PipeTransform } from '@angular/core';

const MS_DIA = 24 * 60 * 60 * 1000;

/** Aceita Date, 'YYYY-MM-DD' (tratado como data local) ou qualquer string de data. */
function paraDataLocal(valor: Date | string | number): Date | null {
  let d: Date;
  if (typeof valor === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(valor.trim())) {
    const [a, m, dia] = valor.trim().split('-').map(Number);
    d = new Date(a, m - 1, dia);
  } else {
    d = new Date(valor);
  }
  return isNaN(d.getTime()) ? null : d;
}

/**
 * Diz quantos dias faltam (ou passaram) até uma data.
 *  hoje          -> 'hoje'
 *  amanhã        -> 'amanhã'
 *  daqui a 5 dias -> 'em 5 dias'
 *  ontem         -> 'ontem'
 *  3 dias atrás  -> 'há 3 dias'
 *  vazio/inválido -> ''
 * O 2º parâmetro (referência) existe para tornar o pipe testável.
 */
@Pipe({ name: 'diasPara' })
export class DiasParaPipe implements PipeTransform {
  transform(data: Date | string | number | null | undefined, referencia: Date = new Date()): string {
    if (data === null || data === undefined || data === '') return '';

    const alvo = paraDataLocal(data);
    if (!alvo) return '';

    // compara apenas o dia (zera a hora), evitando erro de fuso/horário de verão
    const inicioAlvo = Date.UTC(alvo.getFullYear(), alvo.getMonth(), alvo.getDate());
    const inicioRef = Date.UTC(referencia.getFullYear(), referencia.getMonth(), referencia.getDate());
    const dias = Math.round((inicioAlvo - inicioRef) / MS_DIA);

    if (dias === 0) return 'hoje';
    if (dias === 1) return 'amanhã';
    if (dias === -1) return 'ontem';
    return dias > 0 ? `em ${dias} dias` : `há ${Math.abs(dias)} dias`;
  }
}
