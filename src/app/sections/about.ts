import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionTitle } from '../shared/section-title';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionTitle],
  template: `
    <section id="about" class="section shell about">
      <div appReveal class="about__head">
        <app-section-title index="01" [eyebrow]="t().nav.about" [heading]="t().about.title" />
      </div>

      <div class="about__grid">
        <div appReveal class="about__copy">
          <p class="about__body">{{ t().about.body }}</p>
          <p class="about__body about__body--muted">{{ t().about.bodyExtra }}</p>
          <div class="about__domains">
            @for (domain of t().about.domains; track domain) {
              <span class="chip" dir="ltr">{{ domain }}</span>
            }
          </div>
        </div>

        <ul class="about__pillars">
          @for (pillar of t().about.pillars; track pillar.title; let i = $index) {
            <li appReveal [appReveal]="i * 70" class="card about__pillar">
              <span class="about__pillar-icon" aria-hidden="true">
                @switch (pillar.icon) {
                  @case ('layers') {
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="m12 3 9 5-9 5-9-5 9-5Z"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round" />
                      <path
                        d="m3 13 9 5 9-5"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round" />
                    </svg>
                  }
                  @case ('cpu') {
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <rect
                        x="7"
                        y="7"
                        width="10"
                        height="10"
                        rx="2"
                        stroke="currentColor"
                        stroke-width="1.7" />
                      <path
                        d="M10 3v3M14 3v3M10 18v3M14 18v3M3 10h3M3 14h3M18 10h3M18 14h3"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round" />
                    </svg>
                  }
                  @case ('shield') {
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 3l7 3v6c0 5-3.4 8-7 9-3.6-1-7-4-7-9V6l7-3Z"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linejoin="round" />
                      <path
                        d="m9 12 2 2 4-4"
                        stroke="currentColor"
                        stroke-width="1.7"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                    </svg>
                  }
                  @default {
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7" />
                      <path
                        d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"
                        stroke="currentColor"
                        stroke-width="1.7" />
                    </svg>
                  }
                }
              </span>
              <h3 class="about__pillar-title">{{ pillar.title }}</h3>
              <p class="about__pillar-text">{{ pillar.text }}</p>
            </li>
          }
        </ul>
      </div>
    </section>
  `,
  styles: [
    `
      .about__head {
        margin-bottom: 40px;
      }

      .about__grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 40px;
      }

      .about__copy {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 18px;
      }

      .about__body {
        margin: 0;
        font-size: 17px;
        line-height: 1.75;
        color: var(--dim);
      }
      .about__body--muted {
        font-size: 15.5px;
      }

      .about__domains {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 4px;
      }

      .about__pillars {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 12px;
        align-content: start;
      }

      .about__pillar {
        min-width: 0;
        padding: 20px;
      }

      .about__pillar-icon {
        display: block;
        margin-bottom: 12px;
        color: var(--accent);
      }

      .about__pillar-title {
        margin: 0;
        font-family: var(--font-head);
        font-size: 15px;
        font-weight: 600;
        color: var(--fg);
      }

      .about__pillar-text {
        margin: 8px 0 0;
        font-size: 13.5px;
        line-height: 1.65;
        color: var(--dim);
      }

      @media (min-width: 640px) {
        .about__pillars {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (min-width: 1024px) {
        .about__grid {
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: 48px;
        }
      }
    `
  ]
})
export class About {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;
}
