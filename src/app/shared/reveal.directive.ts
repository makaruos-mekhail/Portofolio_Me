import { Directive, ElementRef, OnInit, PLATFORM_ID, inject, input } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Adds a fade/slide-in when the host element first enters the viewport.
 * Pure CSS transition + IntersectionObserver — no animation library needed.
 * Respects prefers-reduced-motion (handled in styles.scss).
 *
 * On the server (prerendering) there is no IntersectionObserver, so the element
 * is marked visible immediately — the prerendered HTML must show real content,
 * never elements stuck at opacity:0. The browser then re-hydrates and future
 * scrolling still animates normally.
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' }
})
export class RevealDirective implements OnInit {
  /** Optional stagger delay in ms. Accepts a bare attribute (no value) too. */
  readonly appReveal = input<number, string | number>(0, {
    transform: (value) => Number(value) || 0
  });

  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngOnInit(): void {
    const el = this.host.nativeElement as HTMLElement;

    // Server / no IntersectionObserver → show content straight away.
    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }

    const delay = this.appReveal();
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -60px 0px', threshold: 0.08 }
    );
    observer.observe(el);
  }
}
