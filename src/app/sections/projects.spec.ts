import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { configureZonelessTestBed } from '../../testing/test-setup';
import { I18nService } from '../core/i18n.service';
import { Projects } from './projects';

describe('Projects', () => {
  beforeEach(() => {
    configureZonelessTestBed({ imports: [Projects] });
  });

  function setup() {
    const fixture = TestBed.createComponent(Projects);
    fixture.detectChanges();
    return fixture;
  }

  it('renders one card per project when the "All" filter is active', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const i18n = TestBed.inject(I18nService);
    const allItems = i18n.t().projectItems;
    const cards = fixture.debugElement.queryAll(By.css('.pj__card'));

    expect(cards.length).toBe(allItems.length);
    expect(cards.length).toBeGreaterThan(0);
  });

  it('renders one filter button per filter key', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const buttons = fixture.debugElement.queryAll(By.css('.pj__filter'));
    expect(buttons.length).toBe(6);
    expect(buttons[0].nativeElement.textContent.trim()).toBe(
      fixture.componentInstance['t']().projects.filters[0],
    );
  });

  it('filters the visible projects when a filter tab is clicked', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const i18n = TestBed.inject(I18nService);
    const personalCount = i18n
      .t()
      .projectItems.filter((p) => p.filterTags.includes('Personal')).length;
    expect(personalCount).toBeGreaterThan(0);

    const buttons = fixture.debugElement.queryAll(By.css('.pj__filter'));
    const personalButton = buttons[5].nativeElement as HTMLButtonElement;
    personalButton.click();
    await fixture.whenStable();

    expect(fixture.componentInstance['active']()).toBe('Personal');
    const cards = fixture.debugElement.queryAll(By.css('.pj__card'));
    expect(cards.length).toBe(personalCount);
  });

  it('marks the active filter tab with aria-selected', async () => {
    const fixture = setup();
    await fixture.whenStable();

    const buttons = fixture.debugElement.queryAll(By.css('.pj__filter'));
    expect(buttons[0].nativeElement.getAttribute('aria-selected')).toBe('true');

    buttons[1].nativeElement.click();
    await fixture.whenStable();

    expect(buttons[0].nativeElement.getAttribute('aria-selected')).toBe('false');
    expect(buttons[1].nativeElement.getAttribute('aria-selected')).toBe('true');
  });

  it('shows the empty state and no cards when no project matches the active filter', async () => {
    const fixture = setup();
    fixture.componentInstance['active'].set('__no-match__');
    await fixture.whenStable();

    const cards = fixture.debugElement.queryAll(By.css('.pj__card'));
    const empty = fixture.debugElement.query(By.css('.pj__empty'));

    expect(cards.length).toBe(0);
    expect(empty).toBeTruthy();
    expect(empty.nativeElement.textContent.trim()).toBe(
      fixture.componentInstance['t']().projects.empty,
    );
  });
});
