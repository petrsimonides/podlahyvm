// Test pro základní načtení stránky a kontrolu hlavních elementů
const { test, expect } = require('@playwright/test');

test.describe('Základní test', () => {
  test('Načtení hlavní stránky', async ({ page }) => {
    // Načtení domovské stránky
    await page.goto('/');
    
    // Kontrola, že hlavní nadpis existuje a obsahuje očekávaný text
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Precizní podlahy');
    
    // Kontrola, že všechny sekce jsou přítomny
    await expect(page.locator('#sluzby')).toBeVisible();
    await expect(page.locator('#o-mne')).toBeVisible();
    await expect(page.locator('#postup')).toBeVisible();
    await expect(page.locator('#reference')).toBeVisible();
    await expect(page.locator('#kontakt')).toBeVisible();
    
    // Kontrola meta údajů
    const title = await page.title();
    expect(title).toBe('Podlahářské práce V-M');
    
    // Kontrola, že navigační menu existuje
    await expect(page.locator('nav')).toBeVisible();
  });
});