import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { axe } from 'vitest-axe';
import { configureZonelessTestBed } from '../testing/test-setup';
import { Home } from './home';

describe('Home page a11y', () => {
  beforeEach(() => {
    configureZonelessTestBed({
      imports: [Home],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { data: { lang: 'en' } } } },
      ],
    });
  });

  it('has no detectable accessibility violations', async () => {
    const fixture = TestBed.createComponent(Home);
    fixture.detectChanges();
    await fixture.whenStable();

    const results = await axe(fixture.nativeElement);
    expect(results.violations).toEqual([]);
  }, 20000);
});
