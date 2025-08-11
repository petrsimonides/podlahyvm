// Test pro kontrolu responsivního designu
const { test, expect } = require('@playwright/test');

test.describe('Responsivní design', () => {
  test('Stránka se správně zobrazí na mobilním zařízení', async ({ page }) => {
    // Nastavení velikosti viewportu na mobilní zařízení
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    await page.goto('/');
    
    // Kontrola, že hamburger menu je viditelné a hlavní navigace je skrytá
    await expect(page.locator('.hamburger-menu')).toBeVisible();
    await expect(page.locator('nav')).not.toBeVisible();
    
    // Kliknutí na hamburger menu
    await page.click('.hamburger-menu');
    
    // Kontrola, že se navigace zobrazila
    await expect(page.locator('nav.active')).toBeVisible();
    
    // Kontrola, že jsou všechny položky menu viditelné
    await expect(page.locator('nav a[href="#sluzby"]')).toBeVisible();
    await expect(page.locator('nav a[href="#o-mne"]')).toBeVisible();
    await expect(page.locator('nav a[href="#postup"]')).toBeVisible();
    await expect(page.locator('nav a[href="#reference"]')).toBeVisible();
    
    // Zavření menu kliknutím na položku
    await page.click('nav a[href="#sluzby"]');
    
    // Kontrola, že se menu zavřelo
    await expect(page.locator('nav.active')).not.toBeVisible();
    
    // Kontrola, že grid v galerii má jednu položku na řádek
    const galleryItemWidth = await page.evaluate(() => {
      const item = document.querySelector('.gallery figure');
      return item.getBoundingClientRect().width;
    });
    
    const galleryWidth = await page.evaluate(() => {
      const gallery = document.querySelector('.gallery');
      return gallery.getBoundingClientRect().width;
    });
    
    // Kontrola, že jeden item zabírá téměř celou šířku (s tolerancí pro padding/margin)
    expect(galleryItemWidth / galleryWidth).toBeGreaterThan(0.9);
  });
  
  test('Stránka se správně zobrazí na tabletu', async ({ page }) => {
    // Nastavení velikosti viewportu na tablet
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Kontrola, že hamburger menu je viditelné a hlavní navigace je skrytá
    await expect(page.locator('.hamburger-menu')).toBeVisible();
    
    // Kontrola, že grid v galerii má dvě položky na řádek
    const firstItemLeft = await page.evaluate(() => {
      const item = document.querySelector('.gallery figure:first-child');
      return item.getBoundingClientRect().left;
    });
    
    const secondItemLeft = await page.evaluate(() => {
      const item = document.querySelector('.gallery figure:nth-child(2)');
      return item.getBoundingClientRect().left;
    });
    
    // Kontrola, že druhý item je napravo od prvního
    expect(secondItemLeft).toBeGreaterThan(firstItemLeft);
    
    // Kontrola, že třetí item je pod prvním (na dalším řádku)
    const firstItemTop = await page.evaluate(() => {
      const item = document.querySelector('.gallery figure:first-child');
      return item.getBoundingClientRect().top;
    });
    
    const thirdItemTop = await page.evaluate(() => {
      const item = document.querySelector('.gallery figure:nth-child(3)');
      return item.getBoundingClientRect().top;
    });
    
    expect(thirdItemTop).toBeGreaterThan(firstItemTop);
  });
  
  test('Stránka se správně zobrazí na desktopu', async ({ page }) => {
    // Nastavení velikosti viewportu na desktop
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    
    // Kontrola, že hamburger menu není viditelné a hlavní navigace je viditelná
    await expect(page.locator('.hamburger-menu')).not.toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    
    // Kontrola, že grid v galerii má tři položky na řádek
    const positions = await page.evaluate(() => {
      const items = document.querySelectorAll('.gallery figure');
      return Array.from(items, item => {
        const rect = item.getBoundingClientRect();
        return { left: rect.left, top: rect.top };
      });
    });
    
    // První tři položky by měly být na stejném řádku (stejná top pozice)
    expect(positions[0].top).toBeCloseTo(positions[1].top, 0);
    expect(positions[1].top).toBeCloseTo(positions[2].top, 0);
    
    // A měly by být vedle sebe (rostoucí left pozice)
    expect(positions[1].left).toBeGreaterThan(positions[0].left);
    expect(positions[2].left).toBeGreaterThan(positions[1].left);
  });
});