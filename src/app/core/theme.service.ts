import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'mk-theme';

/**
 * Owns the light/dark theme. The actual colours live in CSS variables
 * (see styles.scss) so switching is a single class toggle on <html>.
 * The initial value is also applied by an inline script in index.html
 * to avoid a flash of the wrong theme before Angular boots.
 *
 * All DOM/storage access is guarded so the service is safe to construct during
 * server-side rendering / prerendering, where `document` and `localStorage`
 * don't exist.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  readonly theme = signal<Theme>(this.read());
  readonly isDark = () => this.theme() === 'dark';

  constructor() {
    effect(() => {
      const value = this.theme();
      if (!this.isBrowser) return;
      const root = document.documentElement;
      root.classList.toggle('dark', value === 'dark');
      root.style.colorScheme = value;
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage unavailable (private mode) — theme still applies for this session */
      }
    });
  }

  toggle(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }

  private read(): Theme {
    // On the server we always render the dark theme — it's the default the
    // inline script in index.html also applies for first-time visitors.
    if (!this.isBrowser) return 'dark';
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'light' || stored === 'dark') return stored;
    } catch {
      /* ignore */
    }
    return 'dark';
  }
}
