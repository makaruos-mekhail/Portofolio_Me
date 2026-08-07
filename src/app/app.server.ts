import { bootstrapApplication, BootstrapContext } from '@angular/platform-browser';
import { App } from './app';
import { config } from './app.config.server';

/**
 * Server bootstrap used by the prerenderer to render <app-root> to HTML.
 * Angular 19.2+ passes a BootstrapContext that must be forwarded to
 * bootstrapApplication — omitting it fails prerendering with NG0401.
 */
const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default bootstrap;
