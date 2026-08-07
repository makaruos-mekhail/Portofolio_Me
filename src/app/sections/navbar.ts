import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { ScrollService, SectionId } from '../core/scroll.service';
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-navbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Pinned for the whole page: it never hides on scroll, it only picks up
         a blurred background and a border once the page has moved. -->
    <header class="nav" [class.nav--scrolled]="scroll.scrolled()">
      <!-- reading progress -->
      <div
        class="nav__progress"
        [style.transform]="'scaleX(' + scroll.progress() + ')'"
        aria-hidden="true"></div>

      <nav class="nav__bar shell" aria-label="Main">
        <button type="button" (click)="go('home')" class="nav__brand focus-ring">
          Makaruos<span class="nav__brand-dot">.</span>
        </button>

        <!-- desktop links -->
        <ul class="nav__links">
          @for (link of links(); track link.id) {
            <li>
              <button
                type="button"
                (click)="go(link.id)"
                [attr.aria-current]="scroll.activeSection() === link.id ? 'true' : null"
                class="nav__link focus-ring"
                [class.is-active]="scroll.activeSection() === link.id">
                {{ link.label }}
                @if (scroll.activeSection() === link.id) {
                  <span class="nav__link-underline"></span>
                }
              </button>
            </li>
          }
        </ul>

        <div class="nav__actions">
          <button
            type="button"
            (click)="i18n.toggle()"
            [attr.aria-label]="t().nav.switchLang"
            [title]="t().nav.switchLang"
            class="nav__lang focus-ring">
            {{ t().nav.langBtn }}
          </button>

          <button
            type="button"
            (click)="theme.toggle()"
            [attr.aria-label]="theme.isDark() ? t().nav.toLight : t().nav.toDark"
            [title]="theme.isDark() ? t().nav.toLight : t().nav.toDark"
            class="nav__icon-btn focus-ring">
            @if (theme.isDark()) {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" />
                <path
                  d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round" />
              </svg>
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M21 12.6A9 9 0 1 1 11.4 3a7 7 0 0 0 9.6 9.6Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round" />
              </svg>
            }
          </button>

          <button
            type="button"
            (click)="open.set(!open())"
            [attr.aria-expanded]="open()"
            [attr.aria-label]="open() ? t().nav.closeMenu : t().nav.openMenu"
            class="nav__icon-btn nav__burger focus-ring">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              @if (open()) {
                <path
                  d="M18 6 6 18M6 6l12 12"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round" />
              } @else {
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round" />
              }
            </svg>
          </button>
        </div>
      </nav>

      @if (open()) {
        <div class="nav__panel fade-in">
          <ul class="nav__panel-list shell">
            @for (link of links(); track link.id) {
              <li>
                <button
                  type="button"
                  (click)="go(link.id)"
                  class="nav__panel-link"
                  [class.is-active]="scroll.activeSection() === link.id">
                  {{ link.label }}
                </button>
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
  styles: [
    `
      .nav {
        position: fixed;
        inset-inline: 0;
        top: 0;
        z-index: 50;
        border-bottom: 1px solid transparent;
        background: transparent;
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }
      .nav--scrolled {
        border-bottom-color: var(--line);
        background: oklch(var(--c-bg) / 0.85);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
      }

      .nav__progress {
        position: absolute;
        inset-inline: 0;
        bottom: 0;
        height: 2px;
        background: var(--accent);
        transform-origin: left center;
        transition: transform 0.15s ease-out;
      }
      :host-context([dir='rtl']) .nav__progress {
        transform-origin: right center;
      }

      .nav__bar {
        display: flex;
        height: 68px;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
      }

      .nav__brand {
        flex-shrink: 0;
        border: 0;
        background: transparent;
        padding: 0;
        cursor: pointer;
        font-family: var(--font-head);
        font-size: 19px;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: var(--fg);
      }
      .nav__brand-dot {
        color: var(--accent);
      }

      .nav__links {
        display: none;
        align-items: center;
        gap: 4px;
      }

      .nav__link {
        position: relative;
        border: 0;
        background: transparent;
        border-radius: 8px;
        padding: 8px 12px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        color: var(--dim);
        transition: color 0.25s ease;
      }
      .nav__link:hover {
        color: var(--fg);
      }
      .nav__link.is-active {
        color: var(--fg);
      }

      .nav__link-underline {
        position: absolute;
        inset-inline: 12px;
        bottom: -1px;
        height: 2px;
        border-radius: 999px;
        background: var(--accent);
      }

      .nav__actions {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        gap: 8px;
      }

      .nav__lang {
        border: 1px solid var(--line);
        border-radius: 999px;
        background: var(--bg2);
        padding: 8px 12px;
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        color: var(--fg);
        cursor: pointer;
        transition: border-color 0.25s ease;
      }
      .nav__lang:hover {
        border-color: var(--accent);
      }

      .nav__icon-btn {
        display: flex;
        height: 36px;
        width: 36px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: var(--bg2);
        color: var(--fg);
        cursor: pointer;
        transition: border-color 0.25s ease;
      }
      .nav__icon-btn:hover {
        border-color: var(--accent);
      }

      .nav__panel {
        border-top: 1px solid var(--line);
        background: oklch(var(--c-bg) / 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        max-height: calc(100vh - 68px);
        overflow-y: auto;
      }

      .nav__panel-list {
        padding-block: 8px;
      }

      .nav__panel-link {
        width: 100%;
        border: 0;
        background: transparent;
        border-radius: 8px;
        padding: 12px 8px;
        text-align: start;
        font-size: 15px;
        color: var(--dim);
        cursor: pointer;
        transition: color 0.25s ease;
      }
      .nav__panel-link:hover {
        color: var(--fg);
      }
      .nav__panel-link.is-active {
        color: var(--accent);
      }

      @media (min-width: 1024px) {
        .nav__links {
          display: flex;
        }
        .nav__burger {
          display: none;
        }
      }
    `
  ]
})
export class Navbar {
  protected readonly i18n = inject(I18nService);
  protected readonly theme = inject(ThemeService);
  protected readonly scroll = inject(ScrollService);

  protected readonly t = this.i18n.t;
  protected readonly open = signal(false);

  protected readonly links = computed<{ id: SectionId; label: string }[]>(() => {
    const nav = this.t().nav;
    return [
      { id: 'about', label: nav.about },
      { id: 'experience', label: nav.experience },
      { id: 'skills', label: nav.skills },
      { id: 'projects', label: nav.projects },
      { id: 'education', label: nav.education },
      { id: 'contact', label: nav.contact }
    ];
  });

  protected go(id: string): void {
    this.open.set(false);
    this.scroll.scrollTo(id);
  }
}
