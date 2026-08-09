import { expect, test } from '@playwright/test';

test.describe('Contact form', () => {
  test.beforeEach(async ({ page }) => {
    // Never let e2e runs hit the real EmailJS API (real credentials are
    // wired in for production) — intercept and fake a successful response.
    await page.route('https://api.emailjs.com/**', (route) =>
      route.fulfill({ status: 200, body: 'OK' }),
    );
    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();
  });

  test('shows validation errors for empty required fields once touched', async ({ page }) => {
    const nameInput = page.locator('#c-name');
    await nameInput.click();
    await page.locator('#c-email').click();

    await expect(page.locator('.ct__error').first()).toBeVisible();
  });

  test('shows an error for an invalid email address', async ({ page }) => {
    const emailInput = page.locator('#c-email');
    await emailInput.fill('not-an-email');
    await page.locator('#c-msg').click();

    const emailField = page.locator('#c-email').locator('xpath=ancestor::div[contains(@class,"ct__field")]');
    await expect(emailField.locator('.ct__error')).toBeVisible();
  });

  test('submits a valid form and shows the success state', async ({ page }) => {
    await page.locator('#c-name').fill('Makaruos Test');
    await page.locator('#c-email').fill('makaruos.test@example.com');
    await page.locator('#c-msg').fill('This is a test message from Playwright e2e.');

    const submit = page.locator('.ct__submit');
    await submit.click();

    // en.ts contact.success copy ("Your mail app should open now.")
    await expect(submit).toHaveText(/mail app should open now/i, { timeout: 10_000 });
  });
});
