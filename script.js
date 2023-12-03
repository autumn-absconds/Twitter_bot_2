
import puppeteer from 'puppeteer';
import dotenv from 'dotenv';
dotenv.config();
import get_image_discription_js from './get_image_discription_js.js';
import generate_New_Caption from './generate_New_Caption.js';

const PASSWORD = process.env.PASSWORD;
const USERNAME = process.env.USERNAME;

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to Twitter login page
  console.log('Navigating to Twitter login page...');

  await page.goto('https://twitter.com/i/flow/login');

  // Wait for the page to load
  console.log('Waiting for the page to load...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Input username
  console.log('Typing username...');
  const usernameInput = await page.$('input');
  await usernameInput.type(USERNAME);

  // Click on the login button
  console.log('Clicking on the login button...');

  const loginButtons = await page.$$('div[role="button"]');
  await loginButtons[loginButtons.length - 2].click();

  // Wait for the page to load
  console.log('Waiting for the page to load after login...');
  await page.waitForSelector('input[type="password"]');
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Input password
  console.log('Typing password...');
  const passwordInput = await page.$('input[type="password"]');
  await passwordInput.type(PASSWORD);

  // Wait for the page to load
  console.log('Waiting for the page to load after password...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Click on the login button
  console.log('Clicking on the final login button...');
  const finalLoginButton = await page.$$('div[role="button"]');
  await finalLoginButton[finalLoginButton.length - 1].click();

  // Wait for the page to load
  console.log('Waiting for the page to load after final login...');
  await new Promise(resolve => setTimeout(resolve, 10000));

  // Search for a keyword
  const keyword = 'cat memes';
  await page.goto(`https://twitter.com/search?q=${keyword}&src=typed_query`);

  // Wait for the page to load
  await new Promise(resolve => setTimeout(resolve, 15000));

  const n_scrolls = 10; // Number of times to scroll the page aka number of tweets to retweet

  // Perform actions for each scroll
  for (let scroll = 0; scroll < n_scrolls; scroll++) {
    // Click on the retweet button
    const retweetButtons = await page.$$('div[data-testid="retweet"]');
    await retweetButtons[0].click();

    // Wait for some time
    await new Promise(resolve => setTimeout(resolve, 6000));

    // Click on the quote tweet button
    const quoteTweetButton = await page.$('a[role="menuitem"]');
    // const allMenuItems = await page.$$('a[role="menuitem"]');
    // const quoteTweetButton = allMenuItems[0];
    console.log("Quoting Tweet Button:", quoteTweetButton);
    await quoteTweetButton.click();

    // Wait for some time
    await new Promise(resolve => setTimeout(resolve, 6000));

    //------------------------------ get the image url --------------------------------------------------------------------------------

    // Find the image element with the specified criteria
    const imgElements = await page.$x('//img[@alt="Image"]');
    // Store the result in a variable
    let imageDescription = '';
    if (imgElements.length > 0) {
      // Extract the image source (link)
      const imageLink = await (await imgElements[0].getProperty('src')).jsonValue();
      // Print the image link or use it as needed
      console.log("Image Link:", imageLink);
      // Call the function and store the result
      try {
        imageDescription = await get_image_discription_js(imageLink);
      } catch (error) {
        console.error('Error:', error);
      }
      // get_image_discription_js(imageLink)
      //   .then(result => {
      //     console.log('Image Caption:', result);
      //     imageDescription = result; // Store the result in the variable
      //   })
      //   .catch(error => console.error('Error:', error));

    } else {
      console.log("No image found on this tweet.");
      // If there's no image, you can choose to skip the tweet or perform other actions.
    }

    // here we get the caption of the image and save it in imageCaption
    const elementLocator = 'div[data-testid="tweetText"]';
    let imageCaption = '';

    try {
      // Wait for the element to be present on the page
      const elementHandle = await page.waitForSelector(elementLocator, { timeout: 10000 });
      // Extract the full text inside the element
      imageCaption = await page.evaluate(element => element.textContent, elementHandle);
      // Print or do whatever you need with the extracted text
      console.log("Full Text:", imageCaption);
    } catch (error) {
      console.log("Element not found or timed out. No caption available.");
    }

    let postCaption = '';
    // gnerate caption for image
    try {
      postCaption = await generate_New_Caption(imageDescription, imageCaption);
    } catch (error) {
      console.error('Error:', error);

    }
    // generate_New_Caption(imageDescription, imageCaption)
    //   .then(result => {
    //     console.log('New Caption:', result);
    //     postCaption = result; // Store the result in the variable
    //   })
    //   .catch(error => console.error('Error:', error));

   // input the caption
    console.log('postCaption  : ', postCaption);
    const titleInput = await page.$('div[class*="public-DraftStyleDefault-block"]');
    await titleInput.type(postCaption);

    // Wait for some time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Click on the tweet button
    const tweetButton = await page.$('div[data-testid="tweetButton"]');
    await tweetButton.click();
    console.log('Posted ;) hehehehehe');

    // Wait for some time
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Scroll to the bottom of the page
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait for some time
    await new Promise(resolve => setTimeout(resolve, 2000));

  }

  // Close the browser
  console.log('Script completed successfully. Closing the browser.');

  await browser.close();
})();

