import { expect, test } from '@playwright/test';

test.describe('Navigation', () => {
  test('clicking a nav link scrolls the matching section into view', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Contact', exact: true }).first().click();

    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('clicking the brand button scrolls back to the top', async ({ page }) => {
    await page.goto('/');

    await page.getByRole('button', { name: 'Projects', exact: true }).first().click();
    await expect(page.locator('#projects')).toBeInViewport();

    await page.getByRole('button', { name: 'Makaruos.' }).click();
    await expect(page.locator('#home')).toBeInViewport();
  });

  test('project filter tabs switch the visible project cards', async ({ page }) => {
    await page.goto('/');
    await page.locator('#projects').scrollIntoViewIfNeeded();

    const allCount = await page.locator('.pj__card').count();
    expect(allCount).toBeGreaterThan(0);

    await page.locator('.pj__filter', { hasText: /personal/i }).click();
    await expect(page.locator('.pj__card').first()).toBeVisible();
    const filteredCount = await page.locator('.pj__card').count();
    expect(filteredCount).toBeLessThanOrEqual(allCount);
    expect(filteredCount).toBeGreaterThan(0);
  });
});
