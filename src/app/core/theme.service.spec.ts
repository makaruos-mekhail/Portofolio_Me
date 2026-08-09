import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { configureZonelessTestBed } from '../../testing/test-setup';
import { ThemeService } from './theme.service';

@Component({ selector: 'app-theme-test-host', template: '', standalone: true })
class TestHost {}

describe('ThemeService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove('dark');
    configureZonelessTestBed({ imports: [TestHost] });
  });

  it('defaults to dark theme when nothing is stored', async () => {
    const service = TestBed.inject(ThemeService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.theme()).toBe('dark');
    expect(service.isDark()).toBe(true);
  });

  it('reads a previously stored theme preference', async () => {
    localStorage.setItem('mk-theme', 'light');
    const service = TestBed.inject(ThemeService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.theme()).toBe('light');
  });

  it('toggle() flips between light and dark', async () => {
    const service = TestBed.inject(ThemeService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.theme()).toBe('dark');
    service.toggle();
    await fixture.whenStable();
    expect(service.theme()).toBe('light');
    service.toggle();
    await fixture.whenStable();
    expect(service.theme()).toBe('dark');
  });

  it('applies the "dark" class and color-scheme on <html>, and persists to localStorage', async () => {
    const service = TestBed.inject(ThemeService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe('dark');
    expect(localStorage.getItem('mk-theme')).toBe('dark');

    service.toggle();
    await fixture.whenStable();

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.style.colorScheme).toBe('light');
    expect(localStorage.getItem('mk-theme')).toBe('light');
  });
});
