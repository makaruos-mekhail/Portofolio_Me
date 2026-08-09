import { Routes } from '@angular/router';
import { Home } from './home';

/**
 * Same single-page portfolio prerendered twice: '' in English and 'ar' in
 * Arabic. Two static, crawlable URLs — rather than one page that swaps
 * language client-side — are what let search engines index and rank the
 * Arabic name/content on its own.
 */
export const routes: Routes = [
  { path: '', component: Home, data: { lang: 'en' } },
  { path: 'ar', component: Home, data: { lang: 'ar' } }
];
