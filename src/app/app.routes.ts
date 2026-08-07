import { Routes } from '@angular/router';
import { Home } from './home';

/**
 * Single-page portfolio: one route rendering the whole page. Declaring it
 * explicitly is what lets the prerenderer discover and render '' to static HTML.
 */
export const routes: Routes = [{ path: '', component: Home }];
