import { expect, test } from '@playwright/test';

test.describe('Language toggle', () => {
  test('starts in English with ltr direction on "/"', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  });

  test('toggling switches <html lang>/<dir> to Arabic/rtl and back, and persists to localStorage', async ({
    page,
  }) => {
    await page.goto('/');
    const langButton = page.locator('.nav__lang');

    await langButton.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('mk-lang')))
      .toBe('ar');

    await langButton.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('mk-lang')))
      .toBe('en');
  });

  test('the prerendered /ar route renders Arabic content with rtl direction', async ({ page }) => {
    await page.goto('/ar');

    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  });
});
