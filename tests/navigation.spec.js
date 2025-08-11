// Test pro kontrolu navigace na stránce
const { test, expect } = require('@playwright/test');

test.describe('Navigace', () => {
  test('Menu odkazy fungují a scrollují na správné sekce', async ({ page }) => {
    await page.goto('/');
    
    // Kliknutí na odkazy v navigaci a kontrola, že se stránka posunula na správnou sekci
    // Poznámka: musíme použít evaluateHandle pro kontrolu scrollování, protože Playwright nesleduje automaticky scroll pozici
    
    // Kliknutí na odkaz Služby
    await page.click('nav a[href="#sluzby"]');
    // Počkáme na dokončení scrollování
    await page.waitForTimeout(500);
    // Kontrola, že sekce Služby je viditelná v oblasti zobrazení
    const sluzbySectionInView = await page.evaluate(() => {
      const section = document.querySelector('#sluzby');
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight;
    });
    expect(sluzbySectionInView).toBeTruthy();
    
    // Kliknutí na odkaz O nás
    await page.click('nav a[href="#o-mne"]');
    await page.waitForTimeout(500);
    const oMneSectionInView = await page.evaluate(() => {
      const section = document.querySelector('#o-mne');
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight;
    });
    expect(oMneSectionInView).toBeTruthy();
    
    // Kliknutí na odkaz Jak pracujeme
    await page.click('nav a[href="#postup"]');
    await page.waitForTimeout(500);
    const postupSectionInView = await page.evaluate(() => {
      const section = document.querySelector('#postup');
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight;
    });
    expect(postupSectionInView).toBeTruthy();
    
    // Kliknutí na odkaz Reference
    await page.click('nav a[href="#reference"]');
    await page.waitForTimeout(500);
    const referenceSectionInView = await page.evaluate(() => {
      const section = document.querySelector('#reference');
      const rect = section.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight;
    });
    expect(referenceSectionInView).toBeTruthy();
  });
  
  test('Tlačítko Zpět nahoru funguje', async ({ page }) => {
    await page.goto('/');
    
    // Scrollujeme dolů na stránce
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    await page.waitForTimeout(500);
    
    // Kontrola, že tlačítko "zpět nahoru" je viditelné
    await expect(page.locator('.back-to-top')).toBeVisible();
    
    // Kliknutí na tlačítko "zpět nahoru"
    await page.click('.back-to-top');
    await page.waitForTimeout(500);
    
    // Kontrola, že jsme nahoře na stránce
    const atTop = await page.evaluate(() => {
      return window.scrollY === 0;
    });
    expect(atTop).toBeTruthy();
  });
});