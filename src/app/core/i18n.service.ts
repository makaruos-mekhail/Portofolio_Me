import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Dict } from '../i18n/dict';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';

export type Lang = 'en' | 'ar';
const STORAGE_KEY = 'mk-lang';
const DICTS: Record<Lang, Dict> = { en, ar };
const BASE_URL = 'https://portofolio-makaruos.vercel.app';
const PATHS: Record<Lang, string> = { en: '/', ar: '/ar' };

/**
 * Minimal, dependency-free i18n built on signals.
 * `t()` returns the whole dictionary for the active language, so templates
 * read strongly-typed content (i18n.t().hero.role) with no missing-key runtime
 * surprises. Also drives <html lang> and <html dir> for RTL.
 *
 * DOM/storage/navigator access is guarded for safe server-side rendering.
 */
@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly document = inject(DOCUMENT);
  readonly lang = signal<Lang>(this.read());
  readonly t = computed<Dict>(() => DICTS[this.lang()]);
  readonly isRtl = computed(() => this.lang() === 'ar');
  readonly dir = computed<'rtl' | 'ltr'>(() => (this.isRtl() ? 'rtl' : 'ltr'));

  constructor() {
    effect(() => {
      const lang = this.lang();
      // Runs during prerendering too (not just isBrowser), so each of '/' and
      // '/ar' gets its own correct <html lang>, title, description and
      // canonical baked into the static HTML search engines crawl.
      const doc = this.document;
      const root = doc.documentElement;
      root.lang = lang;
      root.dir = this.dir();
      doc.title = this.t().meta.title;
      doc
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', this.t().meta.description);
      const url = BASE_URL + PATHS[lang];
      doc.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
      doc.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
      doc
        .querySelector('meta[property="og:locale"]')
        ?.setAttribute('content', lang === 'ar' ? 'ar_AR' : 'en_US');
      doc
        .querySelector('meta[property="og:locale:alternate"]')
        ?.setAttribute('content', lang === 'ar' ? 'en_US' : 'ar_AR');

      if (!this.isBrowser) return;
      try {
        localStorage.setItem(STORAGE_KEY, lang);
      } catch {
        /* ignore */
      }
    });
  }

  toggle(): void {
    this.lang.update((l) => (l === 'en' ? 'ar' : 'en'));
  }

  use(lang: Lang): void {
    this.lang.set(lang);
  }

  private read(): Lang {
    // Server renders the default (English) markup; the browser then re-reads
    // the visitor's stored preference and swaps if needed.
    if (!this.isBrowser) return 'en';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'ar') return stored;
    } catch {
      /* ignore */
    }
    return navigator.language?.startsWith('ar') ? 'ar' : 'en';
  }
}
