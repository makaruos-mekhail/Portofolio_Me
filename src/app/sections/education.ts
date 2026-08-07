import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionTitle } from '../shared/section-title';

@Component({
  selector: 'app-education',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionTitle],
  template: `
    <section id="education" class="section shell">
      <div appReveal class="ed__head">
        <app-section-title
          index="05"
          [eyebrow]="t().nav.education"
          [heading]="t().education.title" />
      </div>

      <div class="ed__grid">
        <div class="ed__col">
          <h3 class="ed__label">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="m12 4 10 5-10 5L2 9l10-5Z"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round" />
              <path
                d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round" />
            </svg>
            {{ t().education.eduHeading }}
          </h3>
          <ul class="ed__list">
            @for (ed of t().educationItems; track ed.program; let i = $index) {
              <li appReveal [appReveal]="i * 70" class="card ed__item">
                <div class="ed__item-top">
                  <h4 class="ed__item-title">{{ ed.program }}</h4>
                  <span class="ed__item-period" dir="ltr">{{ ed.period }}</span>
                </div>
                <p class="ed__item-school">{{ ed.school }}</p>
                <p class="ed__item-detail">{{ ed.detail }}</p>
              </li>
            }
          </ul>
        </div>

        <div class="ed__col ed__col--side">
          <div>
            <h3 class="ed__label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="9" r="6" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="m8.5 14-1.5 7 5-2.5 5 2.5-1.5-7"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round" />
              </svg>
              {{ t().education.certHeading }}
            </h3>
            <ul class="ed__list">
              @for (cert of t().certItems; track cert.name; let i = $index) {
                <li appReveal [appReveal]="i * 70" class="card ed__cert">
                  <p class="ed__cert-name">{{ cert.name }}</p>
                  <p class="ed__cert-meta">
                    <span>{{ cert.issuer }}</span>
                    <span aria-hidden="true"> · </span>
                    <span dir="ltr">{{ cert.date }}</span>
                  </p>
                </li>
              }
            </ul>
          </div>

          <div>
            <h3 class="ed__label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
                <path
                  d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"
                  stroke="currentColor"
                  stroke-width="1.8" />
              </svg>
              {{ t().education.langHeading }}
            </h3>
            <ul class="ed__langs">
              @for (lang of t().languageItems; track lang.name) {
                <li appReveal class="ed__lang">
                  <div class="ed__lang-top">
                    <span class="ed__lang-name">{{ lang.name }}</span>
                    <span class="ed__lang-level">{{ lang.level }}</span>
                  </div>
                  <span class="ed__lang-track" aria-hidden="true">
                    <span class="ed__lang-fill" [style.width.%]="lang.value"></span>
                  </span>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .ed__head {
        margin-bottom: 40px;
      }

      .ed__grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 40px;
      }

      .ed__col {
        min-width: 0;
      }
      .ed__col--side {
        display: flex;
        flex-direction: column;
        gap: 40px;
      }

      .ed__label {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 0 20px;
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--accent);
      }
      .ed__label svg {
        flex-shrink: 0;
      }

      .ed__list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .ed__item {
        min-width: 0;
        padding: 20px;
      }

      .ed__item-top {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 4px 12px;
      }

      .ed__item-title {
        margin: 0;
        min-width: 0;
        font-family: var(--font-head);
        font-size: 15.5px;
        font-weight: 600;
        color: var(--fg);
      }

      .ed__item-period {
        font-family: var(--font-mono);
        font-size: 12.5px;
        color: var(--accent2);
      }

      .ed__item-school {
        margin: 6px 0 0;
        font-size: 13.5px;
        color: var(--accent);
      }

      .ed__item-detail {
        margin: 8px 0 0;
        font-size: 13.5px;
        line-height: 1.6;
        color: var(--dim);
      }

      .ed__cert {
        padding: 16px;
      }

      .ed__cert-name {
        margin: 0;
        font-size: 13.5px;
        font-weight: 500;
        line-height: 1.5;
        color: var(--fg);
      }

      .ed__cert-meta {
        margin: 6px 0 0;
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--dim);
      }

      .ed__langs {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .ed__lang-top {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        justify-content: space-between;
        gap: 4px 12px;
        margin-bottom: 8px;
      }

      .ed__lang-name {
        font-size: 14px;
        font-weight: 500;
        color: var(--fg);
      }

      .ed__lang-level {
        font-size: 12px;
        color: var(--dim);
        text-align: end;
      }

      .ed__lang-track {
        display: block;
        height: 6px;
        width: 100%;
        overflow: hidden;
        border-radius: 999px;
        background: var(--bg3);
      }

      .ed__lang-fill {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: var(--accent);
        transform: scaleX(0);
        transform-origin: left center;
      }
      :host-context([dir='rtl']) .ed__lang-fill {
        transform-origin: right center;
      }
      /* Fills once the row scrolls into view (RevealDirective adds .is-visible). */
      .ed__lang.is-visible .ed__lang-fill {
        animation: ed-fill 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      }

      @keyframes ed-fill {
        from {
          transform: scaleX(0);
        }
        to {
          transform: scaleX(1);
        }
      }

      @media (min-width: 1024px) {
        .ed__grid {
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
          gap: 48px;
        }
      }
    `
  ]
})
export class Education {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
}
