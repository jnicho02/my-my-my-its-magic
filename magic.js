const puppeteer = require('puppeteer');
// const cheerio = require('cheerio')

const ACCEPT_COOKIES = 'span.cc-close';
const SEARCH = 'input#divGeocodeSearch_input';
const ZOOM_OUT = 'div.esriSimpleSliderDecrementButton';
const ZOOM_IN = 'div.esriSimpleSliderIncrementButton';

const CHECKBOX = ' input[type="checkbox"]'

const COUNTRYSIDE_STEWARDSHIP = 'div.agsjsTOCRootLayer[title="Countryside Stewardship Targeting & Scoring Layers"]';
const BIODIVERSITY = COUNTRYSIDE_STEWARDSHIP + ' + div > div:nth-child(1)' + CHECKBOX;
const WATER = COUNTRYSIDE_STEWARDSHIP + ' + div > div:nth-child(2)' + CHECKBOX;
const CROSS_CUTTING = COUNTRYSIDE_STEWARDSHIP + ' + div > div:nth-child(3)' + CHECKBOX;

const AERIAL_PHOTOGRAPHY = 'div.agsjsTOCRootLayer[title="Aerial Photography"] input[type="checkbox"]';
const TOGGLE = '#divToggleButton';

const POSTCODE = 'BN1 6GE';

async function wait(ms){
   console.log('wait ' + ms);
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

(async () => {
  const browser = await puppeteer.launch({ headless: false });
//  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://www.natureonthemap.naturalengland.org.uk/MagicMap.aspx');
  await wait(3000);
  console.log('click ACCEPT_COOKIES: ' + ACCEPT_COOKIES);
  await page.click(ACCEPT_COOKIES);
  await wait(3000);
  console.log('click SEARCH: ' + SEARCH);
  await page.click(SEARCH);
  console.log('type POSTCODE: ' + POSTCODE);
  await page.type(POSTCODE);
  console.log('press Enter');
  await page.press('Enter');
  await wait(7000);
  console.log('click AERIAL_PHOTOGRAPHY: ' + AERIAL_PHOTOGRAPHY);
  await page.click(AERIAL_PHOTOGRAPHY);
  console.log('click COUNTRYSIDE_STEWARDSHIP: ' + COUNTRYSIDE_STEWARDSHIP + CHECKBOX);
  await page.click(COUNTRYSIDE_STEWARDSHIP + CHECKBOX);
  console.log('click BIODIVERSITY: ' + BIODIVERSITY);
  await page.click(BIODIVERSITY);
  console.log('click ZOOM_IN: ' + ZOOM_IN);
  await page.click(ZOOM_IN);
  console.log('click ZOOM_IN: ' + ZOOM_IN);
  await page.click(ZOOM_IN);
  await page.click(TOGGLE);
  await wait(3000);
  await page.screenshot({path: 'magic.png'});
  await browser.close();
})();
