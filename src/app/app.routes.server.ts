import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Tells the server how to render each route. The single page is prerendered to
 * static HTML at build time, so it can be served by any static host with no
 * Node process at runtime.
 */
export const serverRoutes: ServerRoute[] = [
  { path: '**', renderMode: RenderMode.Prerender }
];
