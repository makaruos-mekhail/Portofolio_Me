import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';
import { SectionTitle } from '../shared/section-title';
import emailjs from '@emailjs/browser';
import { CONTACT, EMAILJS } from '../data/contact.data';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RevealDirective, SectionTitle],
  template: `
    <section id="contact" class="shell ct">
      <div class="ct__grid">
        <div appReveal class="ct__side">
          <app-section-title
            index="06"
            [eyebrow]="t().nav.contact"
            [heading]="t().contact.title"
          />
          <p class="ct__subtitle">{{ t().contact.subtitle }}</p>

          <ul class="ct__links">
            <li>
              <a [href]="'mailto:' + contact.email" class="ct__link" dir="ltr">
                <span class="ct__link-mark" aria-hidden="true">&#64;</span
                >{{ contact.email }}
              </a>
            </li>
            <li>
              <a [href]="'tel:' + contact.phone" class="ct__link" dir="ltr">
                <span class="ct__link-mark" aria-hidden="true">#</span>+20 109
                034 2871
              </a>
            </li>
            <li class="ct__link ct__link--static">
              <span class="ct__link-mark" aria-hidden="true">◈</span
              >{{ t().hero.location }}
            </li>
          </ul>

          <a
            [href]="contact.cvPath"
            download="Makaruos-Mekhail-CV.pdf"
            class="btn btn--ghost ct__cv focus-ring"
          >
            {{ t().hero.cta1 }}
          </a>
        </div>

        <form
          appReveal
          [appReveal]="80"
          [formGroup]="form"
          (ngSubmit)="submit()"
          novalidate
          class="ct__form"
        >
          <div class="ct__field">
            <label for="c-name" class="ct__label">{{ t().contact.name }}</label>
            <input
              id="c-name"
              type="text"
              formControlName="name"
              class="ct__input"
            />
            @if (invalid('name')) {
              <p class="ct__error">{{ t().contact.required }}</p>
            }
          </div>

          <div class="ct__field">
            <label for="c-email" class="ct__label">{{
              t().contact.email
            }}</label>
            <input
              id="c-email"
              type="email"
              dir="ltr"
              formControlName="email"
              class="ct__input"
            />
            @if (invalid('email')) {
              <p class="ct__error">{{ t().contact.invalidEmail }}</p>
            }
          </div>

          <div class="ct__field">
            <label for="c-msg" class="ct__label">{{
              t().contact.message
            }}</label>
            <textarea
              id="c-msg"
              rows="4"
              formControlName="message"
              class="ct__input ct__input--area"
            ></textarea>
            @if (invalid('message')) {
              <p class="ct__error">{{ t().contact.required }}</p>
            }
          </div>

          <button
            type="submit"
            class="ct__submit focus-ring"
            [disabled]="sending()"
          >
            {{
              sending()
                ? t().contact.sending
                : sent()
                  ? t().contact.success
                  : t().contact.send
            }}
          </button>
          @if (failed()) {
            <p class="ct__error">{{ t().contact.failed }}</p>
          }
        </form>
      </div>

      <!-- Closing call to action -->
      <div appReveal class="ct__cta">
        <div class="ct__cta-copy">
          <h3 class="ct__cta-title">{{ t().contact.ctaTitle }}</h3>
          <p class="ct__cta-text">{{ t().contact.ctaText }}</p>
        </div>
        <a [href]="'mailto:' + contact.email" class="ct__cta-btn focus-ring">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 6h16v12H4z" stroke="currentColor" stroke-width="1.7" />
            <path d="m4 7 8 6 8-6" stroke="currentColor" stroke-width="1.7" />
          </svg>
          {{ t().contact.ctaButton }}
        </a>
      </div>
    </section>
  `,
  styles: [
    `
      .ct {
        padding-block: 56px 96px;
      }

      .ct__grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr);
        gap: 40px;
      }

      .ct__side {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 20px;
      }

      .ct__subtitle {
        margin: 0;
        font-size: 16px;
        line-height: 1.7;
        color: var(--dim);
      }

      .ct__links {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .ct__link {
        display: flex;
        align-items: center;
        gap: 12px;
        font-family: var(--font-mono);
        font-size: 14px;
        color: var(--dim);
        overflow-wrap: anywhere;
        transition: color 0.25s ease;
      }
      a.ct__link:hover {
        color: var(--accent);
      }
      .ct__link--static {
        cursor: default;
      }
      .ct__link-mark {
        color: var(--accent);
      }

      .ct__cv {
        width: fit-content;
        margin-top: 8px;
        padding: 12px 20px;
        font-size: 14.5px;
      }

      /* ---- form ---- */
      .ct__form {
        display: flex;
        min-width: 0;
        flex-direction: column;
        gap: 14px;
        border: 1px solid var(--line);
        border-radius: 16px;
        background: var(--bg2);
        padding: 24px;
      }

      .ct__field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .ct__label {
        font-family: var(--font-mono);
        font-size: 12.5px;
        color: var(--dim);
      }

      .ct__input {
        width: 100%;
        border: 1px solid var(--line);
        border-radius: 9px;
        background: var(--bg);
        padding: 12px 14px;
        font-size: 14.5px;
        color: var(--fg);
        outline: none;
        transition: border-color 0.25s ease;
      }
      .ct__input:focus {
        border-color: var(--accent);
      }
      .ct__input--area {
        resize: vertical;
        min-height: 110px;
      }

      .ct__error {
        margin: 0;
        font-size: 11.5px;
        color: var(--accent);
      }

      .ct__submit {
        margin-top: 4px;
        border: 0;
        border-radius: 9px;
        background: var(--accent);
        padding: 14px 20px;
        font-size: 14.5px;
        font-weight: 600;
        color: var(--bg);
        cursor: pointer;
        transition: opacity 0.25s ease;
      }
      .ct__submit:hover {
        opacity: 0.9;
      }

      /* ---- closing CTA ---- */
      .ct__cta {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-top: 24px;
        border: 1px solid oklch(var(--c-accent) / 0.28);
        border-radius: 18px;
        background: oklch(var(--c-accent) / 0.06);
        padding: 28px;
      }

      .ct__cta-copy {
        min-width: 0;
      }

      .ct__cta-title {
        margin: 0;
        font-family: var(--font-head);
        font-size: clamp(19px, 2.4vw, 22px);
        font-weight: 700;
        line-height: 1.3;
        color: var(--fg);
      }

      .ct__cta-text {
        margin: 8px 0 0;
        font-size: 14px;
        line-height: 1.65;
        color: var(--dim);
      }

      .ct__cta-btn {
        display: inline-flex;
        flex-shrink: 0;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        background: var(--accent);
        padding: 13px 20px;
        font-size: 14px;
        font-weight: 600;
        color: var(--bg);
        transition: opacity 0.25s ease;
      }
      .ct__cta-btn:hover {
        opacity: 0.9;
      }

      @media (min-width: 640px) {
        .ct__form {
          padding: 28px;
        }
        .ct__cta {
          flex-direction: row;
          align-items: center;
          padding: 32px;
        }
      }

      @media (min-width: 1024px) {
        .ct__grid {
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: 48px;
        }
      }
    `,
  ],
})
export class Contact {
  private readonly i18n = inject(I18nService);
  private readonly fb = inject(FormBuilder);

  protected readonly t = this.i18n.t;
  protected readonly contact = CONTACT;
  protected readonly sent = signal(false);
  protected readonly sending = signal(false);
  protected readonly failed = signal(false);

  protected readonly form: FormGroup = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  protected invalid(control: string): boolean {
    const c = this.form.get(control);
    return !!c && c.invalid && (c.touched || c.dirty);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.form.getRawValue();

    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      const subject = encodeURIComponent(`Portfolio contact from ${name}`);
      window.location.href = `mailto:${CONTACT.email}?subject=${subject}&body=${body}`;
      this.sent.set(true);
      this.form.reset();
      return;
    }

    this.sending.set(true);
    this.failed.set(false);
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          user_name: name,
          user_email: email,
          message: message,
          reply_to: email,
        },
        { publicKey: EMAILJS.publicKey },
      );
      this.sent.set(true);
      this.form.reset();
    } catch {
      this.failed.set(true);
    } finally {
      this.sending.set(false);
    }
  }
}
