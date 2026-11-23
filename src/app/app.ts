import { Component } from '@angular/core';
import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import { TelefonePipe } from './pipes/telefone-pipe';
import { FormaPagamentoPipe } from './pipes/forma-pagamento-pipe';
import { IniciaisPipe } from './pipes/iniciais-pipe';
import { DiasParaPipe } from './pipes/dias-para-pipe';

interface Evento {
  nome: string;
  local: string;
  data: Date;
  preco: number;
  ocupacao: number; // 0 a 1
  confirmados: number;
}

interface Participante {
  nome: string;
  telefone: string | null;
  pagamento: string | null;
  evento: string;
  data: Date | string | null;
}

/** Cria uma data relativa a hoje, para a agenda sempre parecer "viva". */
function emDias(dias: number, hora = 19, minuto = 0): Date {
  const d = new Date();
  d.setDate(d.getDate() + dias);
  d.setHours(hora, minuto, 0, 0);
  return d;
}

@Component({
  selector: 'app-root',
  imports: [
    // pipes prontos
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    PercentPipe,
    UpperCasePipe,
    TitleCasePipe,
    // pipes criados na atividade
    TelefonePipe,
    FormaPagamentoPipe,
    IniciaisPipe,
    DiasParaPipe,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly eventos: Evento[] = [
    { nome: 'workshop de angular', local: 'salvador - ba', data: emDias(3, 19), preco: 120, ocupacao: 0.75, confirmados: 1500 },
    { nome: 'meetup de javascript', local: 'feira de santana - ba', data: emDias(10, 18, 30), preco: 0, ocupacao: 0.4, confirmados: 38 },
    { nome: 'hackathon unijorge', local: 'campus paralela', data: emDias(21, 8), preco: 49.9, ocupacao: 1, confirmados: 1234.5 },
  ];

  protected readonly participantes: Participante[] = [
    { nome: 'Maria da Silva Santos', telefone: '71988887777', pagamento: 'pix', evento: 'workshop de angular', data: emDias(0) },
    { nome: 'joão pedro', telefone: '7133334444', pagamento: 'credito', evento: 'meetup de javascript', data: emDias(1) },
    { nome: 'Ana', telefone: '+55 (71) 98888-1234', pagamento: 'BOLETO', evento: 'hackathon unijorge', data: emDias(-2) },
    // linhas "esquisitas": os pipes não podem quebrar
    { nome: '', telefone: '', pagamento: '', evento: 'workshop de angular', data: null },
    { nome: 'Carlos de Souza', telefone: '123', pagamento: 'cripto', evento: 'meetup de javascript', data: 'data-invalida' },
  ];
}
