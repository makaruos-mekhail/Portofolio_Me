import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  inject,
  signal
} from '@angular/core';
import { I18nService } from '../core/i18n.service';
import { CONTACT } from '../data/contact.data';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="hero">
      <div class="hero__grid-lines grid-lines" aria-hidden="true"></div>
      <div class="hero__glow orb" aria-hidden="true"></div>

      <div class="hero__inner shell">
        <div class="hero__main">
          <div class="hero__badge" style="animation-delay:0ms">
            <span class="hero__pulse" aria-hidden="true">
              <span class="hero__pulse-ring"></span>
              <span class="hero__pulse-dot"></span>
            </span>
            {{ t().hero.available }}
          </div>

          <h1 class="hero__name text-balance" style="animation-delay:50ms">
            {{ t().hero.name }} <span class="hero__name-soft">{{ t().hero.name_short }}</span>
          </h1>

          <p class="hero__title" style="animation-delay:120ms">{{ t().hero.role }}</p>

          <div class="hero__rotator" aria-live="polite">
            @for (r of roles(); track r; let i = $index) {
              @if (i === roleIndex()) {
                <span class="hero__rotator-text">{{ r }}</span>
              }
            }
          </div>

          <p class="hero__tagline" style="animation-delay:200ms">{{ t().hero.tagline }}</p>

          <div class="hero__actions" style="animation-delay:280ms">
            <a [href]="contact.cvPath" download="Makaruos-Mekhail-CV.pdf" class="btn btn--accent hero__btn focus-ring">
              {{ t().hero.cta1 }}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3v13m0 0-5-5m5 5 5-5M4 21h16"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round" />
              </svg>
            </a>

            <a
              [href]="'mailto:' + contact.email"
              class="btn btn--ghost hero__btn focus-ring">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.6" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.6" />
              </svg>
              {{ t().hero.cta2 }}
            </a>

            <div class="hero__socials">
              <a
                [href]="contact.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                class="hero__social focus-ring">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5S1 4.6 1 3.5 1.9 1.5 3 1.5s1.98.9 1.98 2zM1.2 8.2h3.6V22H1.2zM9.2 8.2h3.4v1.9h.05c.5-.9 1.7-1.9 3.5-1.9 3.7 0 4.4 2.3 4.4 5.4V22h-3.6v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V22H9.2z" />
                </svg>
              </a>
              <a
                [href]="contact.github"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                class="hero__social focus-ring">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    d="M12 .5C5.7.5.8 5.4.8 11.7c0 4.9 3.2 9.1 7.6 10.6.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.7-1.2-1.7-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.3 10.3 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.3-2.6 5.2-5.1 5.5.4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.2 11.2 0 0 0 7.6-10.6C23.2 5.4 18.3.5 12 .5z" />
                </svg>
              </a>
            </div>
          </div>

          <ul class="hero__meta" style="animation-delay:360ms">
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
                  stroke="currentColor"
                  stroke-width="1.8"
                  stroke-linejoin="round" />
                <circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.8" />
              </svg>
              <span>{{ t().hero.location }}</span>
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M6 3c1 3 2 5 4 7s4 3 7 4l2-2 3 3-2 3c-8 1-16-7-15-15l3-2 3 3-2 2z"
                  stroke="currentColor"
                  stroke-width="1.6"
                  stroke-linejoin="round" />
              </svg>
              <a [href]="'tel:' + contact.phone" dir="ltr">+20 109 034 2871</a>
            </li>
            <li>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.6" />
                <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.6" />
              </svg>
              <a [href]="'mailto:' + contact.email" dir="ltr">{{ contact.email }}</a>
            </li>
          </ul>
        </div>

        <div class="hero__aside">
          <div class="hero__window">
            <div class="hero__window-bar">
              <span class="hero__dot hero__dot--red"></span>
              <span class="hero__dot hero__dot--amber"></span>
              <span class="hero__dot hero__dot--green"></span>
              <span class="hero__window-file" dir="ltr">profile.component.ts</span>
            </div>
            <pre class="hero__code" dir="ltr"><code><span class="tok-key">&#64;Component</span>({{ '{' }}
  standalone: <span class="tok-val">true</span>,
  changeDetection: <span class="tok-val">OnPush</span>,
{{ '}' }})
<span class="tok-key">export class</span> <span class="tok-name">Makaruos</span> {{ '{' }}
  role = signal(<span class="tok-str">'Frontend Angular Dev'</span>);
  years = <span class="tok-val">3</span>;
  stack = [<span class="tok-str">'Angular 21'</span>, <span class="tok-str">'Nx'</span>, <span class="tok-str">'RxJS'</span>];
  ships = computed(() =&gt; <span class="tok-str">'production'</span>);
{{ '}' }}</code></pre>
          </div>

          <dl class="hero__stats">
            @for (stat of t().stats; track stat.label) {
              <div class="hero__stat card">
                <dt class="sr-only">{{ stat.label }}</dt>
                <dd>
                  <span class="hero__stat-value">{{ stat.value }}</span>
                  <span class="hero__stat-label">{{ stat.label }}</span>
                </dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        padding-block: clamp(104px, 16vh, 160px) clamp(56px, 10vh, 96px);
      }

      .hero__grid-lines {
        position: absolute;
        inset: 0;
        z-index: -1;
        opacity: 0.7;
        pointer-events: none;
        -webkit-mask-image: radial-gradient(ellipse at 50% 0%, #000 40%, transparent 78%);
        mask-image: radial-gradient(ellipse at 50% 0%, #000 40%, transparent 78%);
      }

      .hero__glow {
        position: absolute;
        top: -160px;
        left: 50%;
        z-index: -1;
        height: 380px;
        width: min(720px, 110%);
        transform: translateX(-50%);
        border-radius: 999px;
        background: radial-gradient(circle, oklch(var(--c-accent) / 0.22) 0%, transparent 70%);
        filter: blur(70px);
        pointer-events: none;
      }

      .hero__inner {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        align-items: center;
        gap: 48px;
      }

      .hero__main > * {
        animation: mm-fade-up 0.6s ease-out both;
      }

      .hero__badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 22px;
        border: 1px solid var(--line);
        border-radius: 999px;
        background: var(--bg2);
        padding: 6px 13px;
        font-family: var(--font-mono);
        font-size: 12.5px;
        color: var(--dim);
      }

      .hero__pulse {
        position: relative;
        display: inline-flex;
        height: 8px;
        width: 8px;
        flex-shrink: 0;
      }
      .hero__pulse-ring {
        position: absolute;
        inset: 0;
        border-radius: 999px;
        background: oklch(var(--c-accent2) / 0.7);
        animation: mm-ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
      }
      .hero__pulse-dot {
        position: relative;
        height: 8px;
        width: 8px;
        border-radius: 999px;
        background: var(--accent2);
      }

      .hero__name {
        margin: 0;
        font-family: var(--font-head);
        font-size: clamp(38px, 6.4vw, 68px);
        font-weight: 700;
        line-height: 1.05;
        letter-spacing: -0.03em;
        color: var(--fg);
      }
      .hero__name-soft {
        color: oklch(var(--c-fg) / 0.42);
      }

      .hero__title {
        margin-top: 18px;
        font-family: var(--font-head);
        font-size: clamp(19px, 2.4vw, 25px);
        font-weight: 600;
        color: var(--accent);
      }

      .hero__rotator {
        margin-top: 8px;
        min-height: 24px;
        font-family: var(--font-mono);
        font-size: 14px;
        color: var(--dim);
      }
      .hero__rotator-text {
        display: inline-block;
        animation: mm-fade-up 0.35s ease-out both;
      }

      .hero__tagline {
        margin-top: 22px;
        max-width: 580px;
        font-size: 16px;
        line-height: 1.7;
        color: var(--dim);
      }

      .hero__actions {
        margin-top: 32px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
      }

      .hero__btn {
        border-radius: 999px;
        padding: 12px 20px;
        font-size: 14.5px;
      }

      .hero__socials {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .hero__social {
        display: flex;
        height: 44px;
        width: 44px;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--line);
        border-radius: 999px;
        color: var(--dim);
        transition: border-color 0.25s ease, color 0.25s ease;
      }
      .hero__social:hover {
        border-color: var(--accent);
        color: var(--accent);
      }

      .hero__meta {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px 24px;
        font-family: var(--font-mono);
        font-size: 12.5px;
        color: var(--dim);
      }
      .hero__meta li {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
      }
      .hero__meta svg {
        flex-shrink: 0;
        color: var(--accent);
      }
      .hero__meta a {
        overflow-wrap: anywhere;
        transition: color 0.25s ease;
      }
      .hero__meta a:hover {
        color: var(--accent);
      }

      /* ---- right column ---- */
      .hero__aside {
        min-width: 0;
        animation: mm-fade-up 0.7s ease-out 0.15s both;
      }

      .hero__window {
        border: 1px solid var(--line);
        border-radius: 16px;
        background: var(--bg2);
        padding: 6px;
        box-shadow: 0 24px 60px -30px oklch(var(--c-fg) / 0.35);
      }

      .hero__window-bar {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 12px;
      }
      .hero__dot {
        height: 10px;
        width: 10px;
        border-radius: 999px;
      }
      .hero__dot--red {
        background: #ff5f57;
      }
      .hero__dot--amber {
        background: #febc2e;
      }
      .hero__dot--green {
        background: #28c840;
      }
      .hero__window-file {
        margin-inline-start: 8px;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--dim);
      }

      .hero__code {
        margin: 0;
        overflow-x: auto;
        border-radius: 12px;
        background: var(--bg);
        padding: 18px;
        font-family: var(--font-mono);
        font-size: 12.5px;
        line-height: 1.7;
        color: var(--dim);
        text-align: start;
      }
      .hero__code .tok-key {
        color: var(--accent);
      }
      .hero__code .tok-str {
        color: var(--accent2);
      }
      .hero__code .tok-val {
        color: var(--accent2);
      }
      .hero__code .tok-name {
        color: var(--fg);
      }

      .hero__stats {
        margin: 16px 0 0;
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      .hero__stat {
        padding: 16px;
      }
      .hero__stat-value {
        display: block;
        font-family: var(--font-head);
        font-size: clamp(22px, 3vw, 26px);
        font-weight: 700;
        color: var(--accent);
      }
      .hero__stat-label {
        display: block;
        margin-top: 4px;
        font-size: 12.5px;
        line-height: 1.4;
        color: var(--dim);
      }

      @media (min-width: 1024px) {
        .hero__inner {
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
          gap: 56px;
        }
      }
    `
  ]
})
export class Hero {
  private readonly i18n = inject(I18nService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly t = this.i18n.t;
  protected readonly contact = CONTACT;
  protected readonly roles = computed(() => this.t().hero.roles);
  protected readonly roleIndex = signal(0);

  constructor() {
    // Cycles the one-liner under the job title. afterNextRender only runs in the
    // browser, so this never touches `window` during server prerendering.
    // Cleared on destroy so it can never keep ticking against a detached view.
    afterNextRender(() => {
      const timer = window.setInterval(() => {
        this.roleIndex.update((i) => (i + 1) % Math.max(1, this.roles().length));
      }, 2600);
      this.destroyRef.onDestroy(() => window.clearInterval(timer));
    });
  }
}
