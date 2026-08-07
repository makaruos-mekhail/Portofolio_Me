import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Section heading used by every section.
 * The eyebrow/heading pair is unchanged; `subtitle` is optional so sections
 * that don't pass one (Experience) render exactly as before.
 */
@Component({
  selector: 'app-section-title',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="st">
      <div class="st__eyebrow">{{ index() }} · {{ eyebrow() }}</div>
      <h2 class="st__heading">{{ heading() }}</h2>
      @if (subtitle()) {
        <p class="st__subtitle">{{ subtitle() }}</p>
      }
    </div>
  `,
  styles: [
    `
      .st {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-width: 0;
      }

      .st__eyebrow {
        font-family: var(--font-mono);
        font-size: 13px;
        letter-spacing: 0.06em;
        color: var(--accent2);
      }

      .st__heading {
        margin: 0;
        font-family: var(--font-head);
        font-size: clamp(26px, 3.4vw, 36px);
        font-weight: 600;
        letter-spacing: -0.02em;
        line-height: 1.15;
        color: var(--fg);
      }

      .st__subtitle {
        margin: 8px 0 0;
        max-width: 640px;
        font-size: 15.5px;
        line-height: 1.7;
        color: var(--dim);
      }
    `
  ]
})
export class SectionTitle {
  readonly index = input.required<string>();
  readonly eyebrow = input.required<string>();
  readonly heading = input.required<string>();
  readonly subtitle = input<string>('');
}
