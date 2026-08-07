import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionTitle } from '../shared/section-title';

@Component({
  selector: 'app-experience',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionTitle],
  template: `
    <section id="experience" class="section shell">
      <div appReveal class="xp__head">
        <app-section-title
          index="02"
          [eyebrow]="t().nav.experience"
          [heading]="t().experience.title" />
      </div>

      <div class="xp__list">
        @for (job of t().jobs; track job.id; let i = $index; let last = $last) {
          <div appReveal class="xp__row">
            <div class="xp__rail" aria-hidden="true">
              <span class="xp__dot" [class.is-open]="isOpen(job.id)"></span>
              @if (!last) {
                <span class="xp__line"></span>
              }
            </div>

            <h3 class="xp__title">
              <button
                type="button"
                (click)="toggle(job.id)"
                [attr.aria-expanded]="isOpen(job.id)"
                class="xp__button focus-ring">
                <span class="xp__top">
                  <span class="xp__company-wrap">
                    <span class="xp__company">{{ job.company }}</span>
                    <span class="xp__tag">{{ job.tag }}</span>
                  </span>
                  <span class="xp__period" dir="ltr">{{ job.period }}</span>
                </span>

                <span class="xp__role">{{ job.role }} · {{ job.location }}</span>
                <span class="xp__subtitle">{{ job.subtitle }}</span>

                @if (isOpen(job.id)) {
                  <span class="xp__bullets">
                    @for (b of job.bullets; track $index) {
                      <span class="xp__bullet">
                        <span class="xp__bullet-mark" aria-hidden="true">—</span>
                        <span class="xp__bullet-text">{{ b }}</span>
                      </span>
                    }
                  </span>
                } @else {
                  <span class="xp__expand">{{ t().experience.expand }}</span>
                }
              </button>
            </h3>
          </div>
        }
      </div>
    </section>
  `,
  styles: [
    `
      .xp__head {
        margin-bottom: 40px;
      }

      .xp__list {
        display: flex;
        flex-direction: column;
      }

      .xp__row {
        position: relative;
        display: grid;
        grid-template-columns: 22px minmax(0, 1fr);
        gap: 16px;
      }

      .xp__rail {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .xp__dot {
        margin-top: 22px;
        height: 12px;
        width: 12px;
        flex-shrink: 0;
        border: 2px solid var(--bg);
        border-radius: 999px;
        background: var(--bg3);
        transition: background-color 0.25s ease, box-shadow 0.25s ease;
      }
      .xp__dot.is-open {
        background: var(--accent);
        box-shadow: 0 0 0 2px oklch(var(--c-accent) / 0.25);
      }

      .xp__line {
        width: 1px;
        flex: 1;
        background: var(--line);
      }

      .xp__title {
        margin: 0;
      }

      .xp__button {
        width: 100%;
        border: 0;
        background: transparent;
        padding: 20px 0 32px;
        text-align: start;
        cursor: pointer;
      }

      .xp__top {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 8px 12px;
      }

      .xp__company-wrap {
        display: flex;
        min-width: 0;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 10px;
      }

      .xp__company {
        font-family: var(--font-head);
        font-size: 19px;
        font-weight: 600;
        color: var(--fg);
      }

      .xp__tag {
        border-radius: 999px;
        background: var(--bg2);
        padding: 3px 10px;
        font-family: var(--font-mono);
        font-size: 13px;
        color: var(--accent2);
      }

      .xp__period {
        font-family: var(--font-mono);
        font-size: 12.5px;
        color: var(--dim);
      }

      .xp__role {
        display: block;
        margin-top: 6px;
        font-size: 14.5px;
        color: var(--dim);
      }

      .xp__subtitle {
        display: block;
        margin-top: 4px;
        font-size: 13px;
        font-style: italic;
        color: var(--dim);
      }

      .xp__bullets {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 16px;
      }

      .xp__bullet {
        display: flex;
        gap: 10px;
        font-size: 14.5px;
        line-height: 1.6;
        color: var(--dim);
      }

      .xp__bullet-mark {
        flex-shrink: 0;
        color: var(--accent);
      }

      .xp__bullet-text {
        min-width: 0;
        overflow-wrap: break-word;
      }

      .xp__expand {
        display: block;
        margin-top: 8px;
        font-family: var(--font-mono);
        font-size: 12.5px;
        color: var(--accent2);
      }

      @media (min-width: 640px) {
        .xp__row {
          gap: 22px;
        }
      }
    `
  ]
})
export class Experience {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
  private readonly openId = signal<string | null>('expand360');

  protected isOpen(id: string): boolean {
    return this.openId() === id;
  }

  protected toggle(id: string): void {
    this.openId.update((current) => (current === id ? null : id));
  }
}
