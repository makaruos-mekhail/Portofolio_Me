import { AfterViewInit, ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
 * it can be the target of the single '' route — which is what the prerenderer
 * discovers and renders to static HTML.
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

  ngAfterViewInit(): void {
    this.scroll.observeSections();
  }
}
