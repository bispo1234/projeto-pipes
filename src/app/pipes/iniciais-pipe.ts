import { Pipe, PipeTransform } from '@angular/core';

const CONECTIVOS = new Set(['de', 'da', 'do', 'das', 'dos', 'e']);

/**
 * Iniciais do nome: primeira e última palavra (ignora "de", "da", "do"...).
 *  'Maria da Silva Santos' -> 'MS'
 *  'ana'                   -> 'A'
 *  '  joão   pedro  '      -> 'JP'
 *  vazio/null              -> '?'
 * Parâmetro opcional: limite de letras (padrão 2).
 */
@Pipe({ name: 'iniciais' })
export class IniciaisPipe implements PipeTransform {
  transform(nome: string | null | undefined, limite = 2): string {
    const palavras = (nome ?? '')
      .trim()
      .split(/\s+/)
      .filter((p) => p && !CONECTIVOS.has(p.toLowerCase()));

    if (palavras.length === 0) return '?';

    const base = palavras.length === 1 ? [palavras[0]] : [palavras[0], palavras[palavras.length - 1]];
    return base
      .map((p) => p.charAt(0).toUpperCase())
      .join('')
      .slice(0, Math.max(1, limite));
  }
}
