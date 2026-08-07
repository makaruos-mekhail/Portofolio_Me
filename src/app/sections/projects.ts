import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { ProjectItem } from '../i18n/dict';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionTitle } from '../shared/section-title';

/**
 * Filter keys stay language-independent; only their labels are translated
 * (projects.filters in the dictionaries, in this exact order).
 *
 * "Company" covers everything delivered as a full-time employee (Expand360,
 * Majisa Egypt, Uktra Digital Solutions); "Freelance" is the part-time,
 * independent work only.
 */
const FILTER_KEYS = ['All', 'Platforms', 'FinTech', 'Company', 'Freelance', 'Personal'];

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionTitle],
  template: `
    <section id="projects" class="section shell">
      <div appReveal class="pj__head">
        <app-section-title
          index="04"
          [eyebrow]="t().nav.projects"
          [heading]="t().projects.title"
          [subtitle]="t().projects.subtitle" />
      </div>

      <div class="pj__filters no-scrollbar" role="tablist" aria-label="Filter projects">
        @for (key of filterKeys; track key; let i = $index) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="active() === key"
            (click)="active.set(key)"
            class="pj__filter focus-ring"
            [class.is-active]="active() === key">
            {{ label(i) }}
          </button>
        }
      </div>

      @if (visible().length) {
        <ul class="pj__grid">
          @for (p of visible(); track p.id; let i = $index) {
            <li appReveal [appReveal]="(i % 4) * 60" class="pj__card">
              <span class="pj__card-glow" aria-hidden="true"></span>

              <div class="pj__card-top">
                <h3 class="pj__name">{{ p.name }}</h3>
                <span class="pj__year" dir="ltr">{{ p.year }}</span>
              </div>

              <p class="pj__category">{{ p.category }}</p>
              <p class="pj__org">{{ p.org }}</p>

              <p class="pj__desc">{{ p.desc }}</p>

              @if (p.metrics?.length) {
                <dl class="pj__metrics">
                  @for (m of p.metrics; track m.label) {
                    <div class="pj__metric">
                      <dd class="pj__metric-value">{{ m.value }}</dd>
                      <dt class="pj__metric-label">{{ m.label }}</dt>
                    </div>
                  }
                </dl>
              }

              <ul class="pj__stack" dir="ltr">
                @for (tech of p.stack; track tech) {
                  <li class="pj__tech">{{ tech }}</li>
                }
              </ul>
            </li>
          }
        </ul>
      } @else {
        <p class="pj__empty">{{ t().projects.empty }}</p>
      }
    </section>
  `,
  styles: [
    `
      .pj__head {
        margin-bottom: 32px;
      }

      .pj__filters {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        margin-inline: calc(var(--pad-x) * -1);
        margin-bottom: 32px;
        padding-inline: var(--pad-x);
        padding-bottom: 4px;
      }

      .pj__filter {
        flex-shrink: 0;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: transparent;
        padding: 8px 16px;
        font-family: var(--font-mono);
        font-size: 12.5px;
        color: var(--dim);
        cursor: pointer;
        transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
      }
      .pj__filter:hover {
        border-color: var(--accent);
        color: var(--fg);
      }
      .pj__filter.is-active {
        border-color: var(--accent);
        background: var(--accent);
        color: var(--bg);
      }

      .pj__grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 16px;
      }

      .pj__card {
        position: relative;
        display: flex;
        min-width: 0;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--bg2);
        padding: 24px;
        transition: border-color 0.25s ease;
      }
      .pj__card:hover {
        border-color: var(--accent);
      }

      .pj__card-glow {
        position: absolute;
        top: -64px;
        inset-inline-end: -64px;
        height: 160px;
        width: 160px;
        border-radius: 999px;
        background: oklch(var(--c-accent) / 0.16);
        filter: blur(48px);
        opacity: 0;
        transition: opacity 0.5s ease;
        pointer-events: none;
      }
      .pj__card:hover .pj__card-glow {
        opacity: 1;
      }

      .pj__card-top {
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 10px;
      }

      .pj__name {
        margin: 0;
        min-width: 0;
        overflow-wrap: break-word;
        font-family: var(--font-head);
        font-size: 18px;
        font-weight: 600;
        color: var(--fg);
      }

      .pj__year {
        flex-shrink: 0;
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--dim);
      }

      .pj__category {
        position: relative;
        margin: 0;
        font-family: var(--font-mono);
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        line-height: 1.5;
        color: var(--accent);
      }

      .pj__org {
        position: relative;
        margin: 6px 0 0;
        font-family: var(--font-mono);
        font-size: 11.5px;
        color: var(--accent2);
      }

      .pj__desc {
        position: relative;
        margin: 16px 0 0;
        flex: 1;
        font-size: 13.5px;
        line-height: 1.65;
        color: var(--dim);
      }

      .pj__metrics {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin: 20px 0 0;
        border-top: 1px solid var(--line);
        padding-top: 16px;
      }
      .pj__metric-value {
        margin: 0;
        font-family: var(--font-head);
        font-size: 17px;
        font-weight: 700;
        color: var(--fg);
      }
      .pj__metric-label {
        margin-top: 2px;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--dim);
      }

      .pj__stack {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 20px;
      }

      .pj__tech {
        border: 1px solid var(--line);
        border-radius: 6px;
        background: var(--bg);
        padding: 2px 8px;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--dim);
      }

      .pj__empty {
        font-size: 14px;
        color: var(--dim);
      }

      @media (min-width: 768px) {
        .pj__grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `
  ]
})
export class Projects {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected readonly filterKeys = FILTER_KEYS;
  protected readonly active = signal<string>('All');

  protected readonly visible = computed<ProjectItem[]>(() => {
    const items = this.t().projectItems;
    const key = this.active();
    return key === 'All' ? items : items.filter((p) => p.filterTags.includes(key));
  });

  /** Filter labels come from the dictionary in the same order as FILTER_KEYS. */
  protected label(index: number): string {
    return this.t().projects.filters[index] ?? FILTER_KEYS[index];
  }
}
