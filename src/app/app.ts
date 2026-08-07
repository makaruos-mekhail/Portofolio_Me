import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { I18nService } from './core/i18n.service';
import { ThemeService } from './core/theme.service';

/**
 * Thin application shell. Instantiates the theme/i18n services eagerly (so they
 * apply on boot) and hosts the router outlet. The actual page lives in `Home`,
 * reached through the single '' route — which is what makes the page
 * prerenderable to static HTML.
 */
@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class App {
  // Instantiated eagerly so theme and language apply on boot.
  private readonly theme = inject(ThemeService);
  private readonly i18n = inject(I18nService);
}
