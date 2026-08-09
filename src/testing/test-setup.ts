import {
  EnvironmentProviders,
  Provider,
  provideZonelessChangeDetection,
} from '@angular/core';
import { TestBed, TestModuleMetadata } from '@angular/core/testing';

/**
 * Configures TestBed with `provideZonelessChangeDetection()` already wired in,
 * so specs never forget it and never accidentally fall back to zone-based
 * change detection. The Angular test environment itself (BrowserTestingModule)
 * is initialized automatically by the @angular/build:unit-test vitest runner.
 */
export function configureZonelessTestBed(config: TestModuleMetadata = {}): void {
  MockIntersectionObserver.instances.length = 0;
  TestBed.configureTestingModule({
    ...config,
    providers: [provideZonelessChangeDetection(), ...(config.providers ?? [])],
  });
}

export function zonelessProviders(
  ...extra: (Provider | EnvironmentProviders)[]
): (Provider | EnvironmentProviders)[] {
  return [provideZonelessChangeDetection(), ...extra];
}

/**
 * happy-dom ships an IntersectionObserver stub that never actually fires
 * (it doesn't compute layout/intersections), so directives relying on it
 * can't be exercised from specs. This mock replaces the global with one
 * whose callback specs can invoke manually via `triggerIntersection()`,
 * simulating an element entering/leaving the viewport.
 */
export class MockIntersectionObserver implements IntersectionObserver {
  static readonly instances: MockIntersectionObserver[] = [];

  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  readonly targets = new Set<Element>();

  constructor(
    readonly callback: IntersectionObserverCallback,
    readonly options?: IntersectionObserverInit,
  ) {
    MockIntersectionObserver.instances.push(this);
  }

  observe(target: Element): void {
    this.targets.add(target);
  }

  unobserve(target: Element): void {
    this.targets.delete(target);
  }

  disconnect(): void {
    this.targets.clear();
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

(globalThis as typeof globalThis & { IntersectionObserver: unknown }).IntersectionObserver =
  MockIntersectionObserver;

/** Simulates an intersection event for `target` on whichever mock observer is watching it. */
export function triggerIntersection(target: Element, isIntersecting: boolean): void {
  const observer = MockIntersectionObserver.instances.find((o) => o.targets.has(target));
  if (!observer) {
    throw new Error('No MockIntersectionObserver is currently observing the given target.');
  }
  const entry = { target, isIntersecting, intersectionRatio: isIntersecting ? 1 : 0 };
  observer.callback([entry as IntersectionObserverEntry], observer);
}
