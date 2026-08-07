import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Dict } from '../i18n/dict';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';

export type Lang = 'en' | 'ar';
const STORAGE_KEY = 'mk-lang';
const DICTS: Record<Lang, Dict> = { en, ar };

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
  readonly lang = signal<Lang>(this.read());
  readonly t = computed<Dict>(() => DICTS[this.lang()]);
  readonly isRtl = computed(() => this.lang() === 'ar');
  readonly dir = computed<'rtl' | 'ltr'>(() => (this.isRtl() ? 'rtl' : 'ltr'));

  constructor() {
    effect(() => {
      const lang = this.lang();
      if (!this.isBrowser) return;
      const root = document.documentElement;
      root.lang = lang;
      root.dir = this.dir();
      document.title = this.t().meta.title;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute('content', this.t().meta.description);
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
