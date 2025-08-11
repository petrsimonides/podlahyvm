// Test pro kontrolu lightboxu galerie
const { test, expect } = require('@playwright/test');

test.describe('Lightbox galerie', () => {
  test('Lightbox se otevře po kliknutí na obrázek', async ({ page }) => {
    await page.goto('/');
    
    // Scrollujeme k sekci s galerií
    await page.evaluate(() => {
      document.querySelector('#reference').scrollIntoView();
    });
    await page.waitForTimeout(500);
    
    // Kliknutí na první obrázek v galerii
    await page.click('.gallery figure:first-child img');
    
    // Kontrola, že se lightbox otevřel
    await expect(page.locator('#imageLightbox.active')).toBeVisible();
    
    // Kontrola, že lightbox obsahuje očekávaný popisek
    await expect(page.locator('#lightboxCaption')).toContainText('Vinyl – obývací pokoj');
    
    // Zavření lightboxu
    await page.click('#lightboxClose');
    
    // Kontrola, že se lightbox zavřel
    await expect(page.locator('#imageLightbox.active')).not.toBeVisible();
  });
  
  test('Lightbox navigace funguje', async ({ page }) => {
    await page.goto('/');
    
    // Scrollujeme k sekci s galerií
    await page.evaluate(() => {
      document.querySelector('#reference').scrollIntoView();
    });
    await page.waitForTimeout(500);
    
    // Kliknutí na první obrázek v galerii
    await page.click('.gallery figure:first-child img');
    
    // Kontrola, že se lightbox otevřel
    await expect(page.locator('#imageLightbox.active')).toBeVisible();
    
    // Kliknutí na tlačítko "další"
    await page.click('#lightboxNext');
    await page.waitForTimeout(300);
    
    // Kontrola, že se zobrazil druhý obrázek
    await expect(page.locator('#lightboxCaption')).toContainText('Laminát – novostavba');
    
    // Kliknutí na tlačítko "další" znovu
    await page.click('#lightboxNext');
    await page.waitForTimeout(300);
    
    // Kontrola, že se zobrazil třetí obrázek
    await expect(page.locator('#lightboxCaption')).toContainText('Dřevěná podlaha – renovace');
    
    // Kliknutí na tlačítko "předchozí"
    await page.click('#lightboxPrev');
    await page.waitForTimeout(300);
    
    // Kontrola, že se vrátil na druhý obrázek
    await expect(page.locator('#lightboxCaption')).toContainText('Laminát – novostavba');
    
    // Zavření lightboxu kliknutím mimo obrázek
    await page.click('#imageLightbox', { position: { x: 10, y: 10 } });
    
    // Kontrola, že se lightbox zavřel
    await expect(page.locator('#imageLightbox.active')).not.toBeVisible();
  });
});