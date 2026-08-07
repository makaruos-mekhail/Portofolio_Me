import { DestroyRef, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const SECTION_IDS = [
  'home',
  'about',
  'experience',
  'skills',
  'projects',
  'education',
  'contact'
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/**
 * Tracks which section is in view (for nav highlighting) and whether the page
 * has been scrolled (for the sticky header state). Uses IntersectionObserver
 * rather than scroll maths so it stays cheap on the main thread.
 *
 * Every window/document access is guarded so the service constructs cleanly on
 * the server; the observers only ever attach in the browser.
 */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly activeSection = signal<SectionId>('home');
  readonly scrolled = signal(false);
  readonly progress = signal(0);

  private observer?: IntersectionObserver;

  constructor() {
    if (!this.isBrowser) return;

    const onScroll = () => {
      const y = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      this.scrolled.set(y > 24);
      this.progress.set(height > 0 ? Math.min(1, y / height) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => {
      window.removeEventListener('scroll', onScroll);
      this.observer?.disconnect();
    });
  }

  /** Called once the sections exist in the DOM. No-op on the server. */
  observeSections(): void {
    if (!this.isBrowser) return;
    this.observer?.disconnect();
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection.set(entry.target.id as SectionId);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    }
  }

  scrollTo(id: string): void {
    if (!this.isBrowser) return;
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  toTop(): void {
    if (!this.isBrowser) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
