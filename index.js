require('dotenv').config();
const puppeteer = require('puppeteer');
const sleep = require('./anki-automation/sleep');
const fs = require('fs');

const cards = JSON.parse(fs.readFileSync('./cards.json', 'utf8'));

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('https://ankiweb.net/account/login');

    await sleep(5000);
    
    await page.waitForSelector('input.form-control.svelte-1ak1s42');

    await page.type('input.form-control.svelte-1ak1s42', process.env.ANKI_EMAIL);

    await page.keyboard.press("Tab");

    await sleep(5000);
    
    await page.keyboard.type(process.env.ANKI_PASSWORD);
    
    await sleep(5000);
    
    await page.keyboard.press("Tab");
    
    await page.keyboard.press("Enter");
    
    await sleep(5000);
    
    await page.goto('https://ankiuser.net/add');

    await sleep(3000);

    for (const card of cards) {
        await page.keyboard.type(card.pergunta);
        
        await sleep(3000);

        await page.keyboard.press("Tab");

        await sleep(3000);

        await page.keyboard.type(card.resposta);

        await sleep(3000);

        await page.keyboard.press("Tab");

        await sleep(3000);

        await page.keyboard.type(card.tag);
        
        await sleep(3000);

        await page.keyboard.press("Tab");

        await page.keyboard.press("Enter");

        await sleep(3000);

        await page.keyboard.press("F5");
    }

    await browser.close();
})();