import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { ScrollService } from '../core/scroll.service';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="ft">
      <div class="ft__inner shell">
        <span>{{ t().footer }}</span>
        <div class="ft__right">
          <span>{{ t().hero.location }}</span>
          <button
            type="button"
            (click)="scroll.toTop()"
            [attr.aria-label]="t().backToTop"
            class="ft__top focus-ring">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 20V4m0 0-6 6m6-6 6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  `,
  styles: [
    `
      .ft {
        border-top: 1px solid var(--line);
      }

      .ft__inner {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding-block: 28px 36px;
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--dim);
      }

      .ft__right {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .ft__top {
        display: flex;
        height: 32px;
        width: 32px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: transparent;
        color: var(--fg);
        cursor: pointer;
        transition: border-color 0.25s ease, color 0.25s ease;
      }
      .ft__top:hover {
        border-color: var(--accent);
        color: var(--accent);
      }
    `
  ]
})
export class Footer {
  private readonly i18n = inject(I18nService);
  protected readonly scroll = inject(ScrollService);
  protected readonly t = this.i18n.t;
}
