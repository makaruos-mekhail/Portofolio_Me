import { expect, test } from '@playwright/test';

test.describe('Theme persistence', () => {
  test('defaults to dark theme on first visit', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('mk-theme')))
      .toBe('dark');
  });

  test('toggling the theme updates <html> and survives a reload', async ({ page }) => {
    await page.goto('/');

    const themeButton = page.locator('.nav__icon-btn').first();
    await themeButton.click();

    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('mk-theme')))
      .toBe('light');

    await page.reload();

    await expect(page.locator('html')).not.toHaveClass(/dark/);
    await expect
      .poll(() => page.evaluate(() => localStorage.getItem('mk-theme')))
      .toBe('light');
  });
});
