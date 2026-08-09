import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { I18nService, Lang } from './core/i18n.service';
import { ScrollService } from './core/scroll.service';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Education } from './sections/education';
import { Experience } from './sections/experience';
import { Footer } from './sections/footer';
import { Hero } from './sections/hero';
import { Navbar } from './sections/navbar';
import { Projects } from './sections/projects';
import { Skills } from './sections/skills';

/**
 * The portfolio page itself. Split out from `App` (now a thin router shell) so
 * it can be the target of the '' and 'ar' routes — both of which the
 * prerenderer discovers and renders to static HTML.
 */
@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Hero, About, Experience, Skills, Projects, Education, Contact, Footer],
  template: `
    <div class="app-shell">
      <app-navbar />
      <main>
        <app-hero />
        <app-about />
        <app-experience />
        <app-skills />
        <app-projects />
        <app-education />
        <app-contact />
      </main>
      <app-footer />
    </div>
  `,
  styles: [
    `
      .app-shell {
        min-height: 100vh;
        width: 100%;
        overflow-x: hidden;
        background: var(--bg);
        color: var(--fg);
      }
    `
  ]
})
export class Home implements AfterViewInit {
  private readonly scroll = inject(ScrollService);

  constructor() {
    // Each route owns a fixed language ('' -> en, 'ar' -> ar) so the
    // prerenderer bakes real Arabic/English markup into that URL instead of
    // relying on a client-side toggle search engines never see. Setting it
    // here, before the first render, keeps SSR output and client hydration
    // in sync regardless of any stored language preference.
    const route = inject(ActivatedRoute);
    const lang = route.snapshot.data['lang'] as Lang | undefined;
    if (lang) inject(I18nService).use(lang);
  }

  ngAfterViewInit(): void {
    this.scroll.observeSections();
  }
}
