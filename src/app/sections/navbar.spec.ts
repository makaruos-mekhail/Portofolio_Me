import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureZonelessTestBed } from '../../testing/test-setup';
import { ScrollService } from '../core/scroll.service';
import { Navbar } from './navbar';

describe('Navbar', () => {
  beforeEach(() => {
    configureZonelessTestBed({ imports: [Navbar] });
  });

  function setup() {
    const fixture = TestBed.createComponent(Navbar);
    fixture.detectChanges();
    return fixture;
  }

  describe('mobile menu toggle', () => {
    it('starts closed', async () => {
      const fixture = setup();
      await fixture.whenStable();

      expect(fixture.componentInstance['open']()).toBe(false);
      expect(fixture.debugElement.query(By.css('.nav__panel'))).toBeFalsy();
      const burger = fixture.debugElement.query(By.css('.nav__burger')).nativeElement;
      expect(burger.getAttribute('aria-expanded')).toBe('false');
    });

    it('opens on the first click', async () => {
      const fixture = setup();
      await fixture.whenStable();

      const burger = fixture.debugElement.query(By.css('.nav__burger'))
        .nativeElement as HTMLButtonElement;
      burger.click();
      await fixture.whenStable();

      expect(fixture.componentInstance['open']()).toBe(true);
      expect(fixture.debugElement.query(By.css('.nav__panel'))).toBeTruthy();
      expect(burger.getAttribute('aria-expanded')).toBe('true');
    });

    it('closes again on the second click', async () => {
      const fixture = setup();
      await fixture.whenStable();

      const burger = fixture.debugElement.query(By.css('.nav__burger'))
        .nativeElement as HTMLButtonElement;
      burger.click();
      await fixture.whenStable();
      burger.click();
      await fixture.whenStable();

      expect(fixture.componentInstance['open']()).toBe(false);
      expect(fixture.debugElement.query(By.css('.nav__panel'))).toBeFalsy();
      expect(burger.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('active link', () => {
    it('marks the link matching the active section with aria-current and is-active', async () => {
      const fixture = setup();
      const scroll = TestBed.inject(ScrollService);
      await fixture.whenStable();

      scroll.activeSection.set('skills');
      await fixture.whenStable();

      const links = fixture.debugElement.queryAll(By.css('.nav__links .nav__link'));
      const activeIndex = 2; // links(): about, experience, skills, projects, education, contact

      links.forEach((link, i) => {
        const el = link.nativeElement as HTMLButtonElement;
        if (i === activeIndex) {
          expect(el.getAttribute('aria-current')).toBe('true');
          expect(el.classList.contains('is-active')).toBe(true);
        } else {
          expect(el.getAttribute('aria-current')).toBeNull();
          expect(el.classList.contains('is-active')).toBe(false);
        }
      });
    });

    it('moves the active state when the section changes again', async () => {
      const fixture = setup();
      const scroll = TestBed.inject(ScrollService);
      await fixture.whenStable();

      scroll.activeSection.set('about');
      await fixture.whenStable();
      let links = fixture.debugElement.queryAll(By.css('.nav__links .nav__link'));
      expect((links[0].nativeElement as HTMLButtonElement).getAttribute('aria-current')).toBe(
        'true',
      );

      scroll.activeSection.set('contact');
      await fixture.whenStable();
      links = fixture.debugElement.queryAll(By.css('.nav__links .nav__link'));
      expect((links[0].nativeElement as HTMLButtonElement).getAttribute('aria-current')).toBeNull();
      expect((links[5].nativeElement as HTMLButtonElement).getAttribute('aria-current')).toBe(
        'true',
      );
    });
  });

  describe('mobile menu auto-close', () => {
    it('closes the menu after clicking a link inside it', async () => {
      const fixture = setup();
      const scroll = TestBed.inject(ScrollService);
      // Avoid the real scrollIntoView/scrollTo browser call so the test only
      // exercises the navbar's own open/close behaviour.
      vi.spyOn(scroll, 'scrollTo').mockImplementation(() => {});
      await fixture.whenStable();

      const burger = fixture.debugElement.query(By.css('.nav__burger'))
        .nativeElement as HTMLButtonElement;
      burger.click();
      await fixture.whenStable();
      expect(fixture.componentInstance['open']()).toBe(true);

      const panelLink = fixture.debugElement.query(By.css('.nav__panel-link'))
        .nativeElement as HTMLButtonElement;
      panelLink.click();
      await fixture.whenStable();

      expect(fixture.componentInstance['open']()).toBe(false);
      expect(fixture.debugElement.query(By.css('.nav__panel'))).toBeFalsy();
      expect(scroll.scrollTo).toHaveBeenCalledTimes(1);
    });
  });
});
