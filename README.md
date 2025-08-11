// README s instrukcemi pro spuštění testů
# Testy pro web Podlahářské práce V-M

Toto je sada testů pomocí Playwright pro ověření funkčnosti webu.

## Instalace

Pro spuštění testů je potřeba mít nainstalovaný Node.js a npm. Poté stačí nainstalovat závislosti:

```bash
npm install
```

## Spuštění testů

Pro spuštění všech testů:

```bash
npm test
```

Pro spuštění konkrétního testu:

```bash
npx playwright test tests/basic.spec.js
```

Pro spuštění testů v konkrétním prohlížeči:

```bash
npx playwright test --project=chromium
```

## Režim debug

Pro ladění testů v režimu debug:

```bash
npx playwright test --debug
```

## Generování reportu

Po spuštění testů se vygeneruje HTML report, který lze zobrazit příkazem:

```bash
npx playwright show-report
```

## Struktura testů

- `basic.spec.js` - Základní test pro kontrolu načtení stránky a přítomnosti hlavních elementů
- `navigation.spec.js` - Testy pro kontrolu navigace a scrollování na stránce
- `lightbox.spec.js` - Testy pro kontrolu funkčnosti galerie a lightboxu
- `responsive.spec.js` - Testy pro kontrolu responsivního designu na různých zařízeních
- `modals.spec.js` - Testy pro kontrolu modálních oken a cookie banneru

## Lokální testování

Pro lokální spuštění webu můžete použít:

```bash
npm run serve
```

Web bude dostupný na adrese http://localhost:3000