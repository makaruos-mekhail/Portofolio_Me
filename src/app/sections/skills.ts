import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { SkillGroup } from '../i18n/dict';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionTitle } from '../shared/section-title';

@Component({
  selector: 'app-skills',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RevealDirective, SectionTitle],
  template: `
    <section id="skills" class="section shell">
      <div appReveal class="sk__head">
        <app-section-title
          index="03"
          [eyebrow]="t().nav.skills"
          [heading]="t().skills.title"
          [subtitle]="t().skills.subtitle" />
      </div>

      <div class="sk__grid">
        <ul
          class="sk__tabs no-scrollbar"
          role="tablist"
          [attr.aria-label]="t().skills.groupsLabel">
          @for (group of t().skillGroups; track group.id) {
            <li class="sk__tab-item" role="presentation">
              <button
                type="button"
                role="tab"
                [attr.aria-selected]="group.id === activeId()"
                (click)="activeId.set(group.id)"
                class="sk__tab focus-ring"
                [class.is-active]="group.id === activeId()">
                <span class="sk__tab-dot" aria-hidden="true"></span>
                <span class="sk__tab-label">{{ group.title }}</span>
              </button>
            </li>
          }
        </ul>

        <div appReveal [appReveal]="60" class="sk__panel">
          @for (group of activeGroup(); track group.id) {
            <div class="sk__panel-inner">
              <h3 class="sk__panel-title">{{ group.title }}</h3>
              <ul class="sk__items">
                @for (item of group.items; track item; let i = $index) {
                  <li class="sk__item" [style.animation-delay]="i * 30 + 'ms'" dir="auto">
                    {{ item }}
                  </li>
                }
              </ul>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .sk__head {
        margin-bottom: 40px;
      }

      .sk__grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 24px;
      }

      .sk__tabs {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding-bottom: 8px;
        margin-inline: calc(var(--pad-x) * -1);
        padding-inline: var(--pad-x);
      }

      .sk__tab-item {
        flex-shrink: 0;
      }

      .sk__tab {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        border: 1px solid transparent;
        border-radius: 10px;
        background: transparent;
        padding: 11px 16px;
        text-align: start;
        font-size: 14px;
        font-weight: 500;
        color: var(--dim);
        cursor: pointer;
        transition: color 0.25s ease, border-color 0.25s ease, background-color 0.25s ease;
      }
      .sk__tab:hover {
        color: var(--fg);
      }
      .sk__tab.is-active {
        color: var(--fg);
        border-color: oklch(var(--c-accent) / 0.45);
        background: oklch(var(--c-accent) / 0.08);
      }

      .sk__tab-dot {
        height: 6px;
        width: 6px;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--bg3);
        transition: background-color 0.25s ease;
      }
      .sk__tab.is-active .sk__tab-dot {
        background: var(--accent);
      }

      .sk__panel {
        min-width: 0;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--bg2);
        padding: 24px;
      }

      .sk__panel-inner {
        animation: mm-fade-up 0.3s ease-out both;
      }

      .sk__panel-title {
        margin: 0 0 20px;
        font-family: var(--font-mono);
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: var(--accent);
      }

      .sk__items {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .sk__item {
        border: 1px solid var(--line);
        border-radius: 10px;
        background: var(--bg);
        padding: 8px 14px;
        font-size: 13.5px;
        color: var(--dim);
        animation: mm-fade-up 0.3s ease-out both;
        transition: border-color 0.25s ease, color 0.25s ease;
      }
      .sk__item:hover {
        border-color: var(--accent);
        color: var(--fg);
      }

      @media (min-width: 640px) {
        .sk__panel {
          padding: 32px;
        }
      }

      @media (min-width: 1024px) {
        .sk__grid {
          grid-template-columns: 280px minmax(0, 1fr);
        }
        .sk__tabs {
          flex-direction: column;
          overflow-x: visible;
          padding-bottom: 0;
          margin-inline: 0;
          padding-inline: 0;
        }
        .sk__tab-item {
          flex-shrink: 1;
        }
      }
    `
  ]
})
export class Skills {
  private readonly i18n = inject(I18nService);
  protected readonly t = this.i18n.t;

  protected readonly activeId = signal<string>('core');

  /** Wrapped in an array so @for re-creates the panel and replays its animation. */
  protected readonly activeGroup = computed<SkillGroup[]>(() => {
    const groups = this.t().skillGroups;
    return [groups.find((g) => g.id === this.activeId()) ?? groups[0]];
  });
}
