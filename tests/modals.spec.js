// Test pro kontrolu modálních oken
const { test, expect } = require('@playwright/test');

test.describe('Modální okna', () => {
  test('Kontaktní modál se správně otevře a zavře', async ({ page }) => {
    await page.goto('/');
    
    // Kliknutí na tlačítko "Kontaktujte nás" v hlavičce
    await page.click('#poptavkaBtn');
    
    // Kontrola, že se modální okno otevřelo
    await expect(page.locator('#contactModal.active')).toBeVisible();
    
    // Kontrola, že modální okno obsahuje očekávané informace
    await expect(page.locator('#contactModal .modal-content h3')).toContainText('Kontaktujte nás');
    await expect(page.locator('#contactModal .modal-card')).toHaveCount(3);
    
    // Zavření modálního okna pomocí křížku
    await page.click('#modalClose');
    
    // Kontrola, že se modální okno zavřelo
    await expect(page.locator('#contactModal.active')).not.toBeVisible();
    
    // Otevření modálního okna znovu kliknutím na tlačítko v hero sekci
    await page.click('#poptavkaBtn2');
    
    // Kontrola, že se modální okno otevřelo
    await expect(page.locator('#contactModal.active')).toBeVisible();
    
    // Zavření modálního okna kliknutím mimo něj
    await page.click('#contactModal', { position: { x: 10, y: 10 } });
    
    // Kontrola, že se modální okno zavřelo
    await expect(page.locator('#contactModal.active')).not.toBeVisible();
  });
  
  test('Cookie banner se zobrazí a lze ho zavřít', async ({ page }) => {
    // Nastavíme maximální čas, po který budeme čekat na zobrazení cookie banneru
    await page.goto('/');
    
    // Počkáme, až se cookie banner zobrazí (má 1s zpoždění)
    await page.waitForTimeout(1500);
    
    // Kontrola, že cookie banner je viditelný
    await expect(page.locator('#cookieBanner.active')).toBeVisible();
    
    // Kliknutí na tlačítko "Jen nezbytné"
    await page.click('#cookieAcceptNecessary');
    
    // Kontrola, že cookie banner zmizel
    await expect(page.locator('#cookieBanner.active')).not.toBeVisible();
    
    // Obnovíme stránku a zkontrolujeme, že se banner již nezobrazí
    await page.reload();
    await page.waitForTimeout(1500);
    
    // Cookie banner by neměl být aktivní po nastavení cookie
    await expect(page.locator('#cookieBanner.active')).not.toBeVisible();
  });
  
  test('Cookie zásady se zobrazí po kliknutí na odkaz', async ({ page }) => {
    // Resetujeme cookies, aby se banner zobrazil
    await page.context().clearCookies();
    await page.goto('/');
    
    // Počkáme, až se cookie banner zobrazí
    await page.waitForTimeout(1500);
    
    // Kliknutí na odkaz "zásadách cookies"
    await page.click('#cookiePolicyLink');
    
    // Kontrola, že se modální okno se zásadami cookies otevřelo
    await expect(page.locator('#cookiePolicyModal.active')).toBeVisible();
    
    // Kontrola, že modální okno obsahuje očekávané informace
    await expect(page.locator('#cookiePolicyModal h3')).toContainText('Zásady používání cookies');
    
    // Zavření modálního okna pomocí tlačítka "Rozumím"
    await page.click('#cookiePolicyConfirm');
    
    // Kontrola, že se modální okno zavřelo
    await expect(page.locator('#cookiePolicyModal.active')).not.toBeVisible();
  });
});