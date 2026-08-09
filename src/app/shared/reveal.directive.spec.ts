import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import {
  MockIntersectionObserver,
  configureZonelessTestBed,
  triggerIntersection,
} from '../../testing/test-setup';
import { RevealDirective } from './reveal.directive';

@Component({
  selector: 'app-reveal-test-host',
  standalone: true,
  imports: [RevealDirective],
  template: `<div appReveal class="target"></div>`,
})
class TestHost {}

describe('RevealDirective', () => {
  beforeEach(() => {
    configureZonelessTestBed({ imports: [TestHost] });
  });

  function setup() {
    const fixture = TestBed.createComponent(TestHost);
    fixture.detectChanges();
    return fixture;
  }

  it('does not have the "is-visible" class before any intersection is reported', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('.target') as HTMLElement;
    expect(el.classList.contains('is-visible')).toBe(false);
  });

  it('adds the "is-visible" class once the element is reported as intersecting', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('.target') as HTMLElement;
    triggerIntersection(el, true);
    await fixture.whenStable();

    expect(el.classList.contains('is-visible')).toBe(true);
  });

  it('disconnects the observer after the element becomes visible, and only once', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const el = fixture.nativeElement.querySelector('.target') as HTMLElement;
    const observer = MockIntersectionObserver.instances.find((o) => o.targets.has(el));
    expect(observer).toBeTruthy();
    const disconnectSpy = vi.spyOn(observer!, 'disconnect');

    triggerIntersection(el, true);
    await fixture.whenStable();

    expect(disconnectSpy).toHaveBeenCalledTimes(1);
    // disconnect() clears the target set, proving the directive actually
    // stopped observing rather than just happening to run once here.
    expect(observer!.targets.has(el)).toBe(false);
  });
});
