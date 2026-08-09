import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { configureZonelessTestBed } from '../../testing/test-setup';
import { I18nService } from './i18n.service';

@Component({ selector: 'app-i18n-test-host', template: '', standalone: true })
class TestHost {}

describe('I18nService', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('lang');
    document.documentElement.removeAttribute('dir');
    configureZonelessTestBed({ imports: [TestHost] });
  });

  it('defaults to English when nothing is stored and the browser locale is not Arabic', async () => {
    const service = TestBed.inject(I18nService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.lang()).toBe('en');
    expect(service.isRtl()).toBe(false);
    expect(service.dir()).toBe('ltr');
  });

  it('reads a previously stored language preference', async () => {
    localStorage.setItem('mk-lang', 'ar');
    const service = TestBed.inject(I18nService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.lang()).toBe('ar');
    expect(service.isRtl()).toBe(true);
    expect(service.dir()).toBe('rtl');
  });

  it('use() switches the active language and t() returns the matching dictionary', async () => {
    const service = TestBed.inject(I18nService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.t().meta.title).not.toBe('');
    const enTitle = service.t().meta.title;

    service.use('ar');
    await fixture.whenStable();

    expect(service.lang()).toBe('ar');
    expect(service.t().meta.title).not.toBe(enTitle);
  });

  it('toggle() flips between en and ar', async () => {
    const service = TestBed.inject(I18nService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(service.lang()).toBe('en');
    service.toggle();
    await fixture.whenStable();
    expect(service.lang()).toBe('ar');
    service.toggle();
    await fixture.whenStable();
    expect(service.lang()).toBe('en');
  });

  it('sets <html lang> and <html dir> to match the active language, and persists to localStorage', async () => {
    const service = TestBed.inject(I18nService);
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    expect(localStorage.getItem('mk-lang')).toBe('en');

    service.use('ar');
    await fixture.whenStable();

    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
    expect(localStorage.getItem('mk-lang')).toBe('ar');
  });
});
