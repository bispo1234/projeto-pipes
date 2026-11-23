import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { appConfig } from './app.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('deve criar o app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deve renderizar o título e as linhas de participantes', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('português');
    expect(el.querySelectorAll('tbody tr').length).toBe(5);
  });
});
