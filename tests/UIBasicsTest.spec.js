const {test, expect} = require('@playwright/test');

test('Verify title matching', async ({browser})=> {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    console.log(await page.title());
    await expect(page).toHaveTitle("Practice Page");
});

test('Verify title matching for google', async ({page})=> {
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});

test('Form assertion', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    await page.locator('input#username').fill('Rahat');
    await page.locator("[type='password']").fill('123456');
    await page.locator('#signInBtn').click();
});

test('Form validation message', async ({page})=> {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Title: "+ await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await page.locator('input#username').fill('Rahat');
    await page.locator("[type='password']").fill('123456'); //.fill for text input
    await page.locator('#signInBtn').click(); // same as input#username .click for clicking button
    console.log("Error message: "+ await page.locator("[style*=block]").textContent()); // .textContent for extracts message
    await expect(page.locator("[style*=block]")).toContainText('Incorrect'); //assertion
});

test('Fetch product from dashboard', async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('input#username');
    const password = page.locator("[type='password']");
    const signInButton = page.locator('#signInBtn');
    const itemList = page.locator(".card-body a"); 

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log("Title: "+ await page.title());
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    
    // Entering incorrect credentials
    await username.fill('rahulshetty');
    await password.fill('learning'); //.fill for text input
    await signInButton.click(); // same as input#username .click for clicking button
    
    console.log("Error message: "+ await page.locator("[style*=block]").textContent()); // .textContent for extracts message
    await expect(page.locator("[style*=block]")).toContainText('Incorrect'); //assertion

    // Entering correct credentials
    await username.fill(""); //resets the input field
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInButton.click();
    console.log("SignIn Successful");

    //Fetching data from dashboard
    console.log(await itemList.first().textContent()); //fetches the first element
    //await expect(itemList).toContainText('iphone X');
    console.log(await itemList.nth(1).textContent()); //fetches the nth element from list
    const allItems = await itemList.allTextContents(); //fetches all the element from list
    console.log (allItems);
});

test('UI control', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator('input#username');
    const password = page.locator("[type='password']");

    await page.locator('input#username').fill("arnob");
    await page.locator('input#password').fill("12345");
    await page.locator('select.form-control');
    await page.locator('select.form-control').selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await expect(page.locator('.radiotextsty').last()).toBeChecked(); //assertion

    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();

    //for uncheck assertion
    await page.locator('#terms').uncheck();
     expect(await page.locator('#terms').isChecked()).toBeFalsy(); 

    //await page.locator('input#signInBtn');

    //await page.pause();
});

test('child window handle', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username = page.locator('input#username');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const docLink = page.locator("[href*='documents-request']");

    // selecting blinking link
    await expect(docLink).toHaveAttribute("class","blinkingText");

    // make steps synchronys we use await, to make steps asysnchronus we use Promise
    //promise are 3types: pending, rejected, fulfilled
    const [newPage] = await Promise.all([
    context.waitForEvent('page'), // waits for new page to open
    docLink.click(),   
/*
    const [newPage, anotherPage] = await Promise.all
    user more valiables if more pages are available and follow the same procedure.
*/
    // await page.pause(), // this will keep the browser open after execution
    ])
    const text = await newPage.locator(".redd").textContent(); //extracting text based on the class "red"
    console.log(text);    

    const arrayText = text.split("@"); // spliting the extracted text at "@"
    const domain = arrayText[1].split(" ")[0]; // taking the 2nd position and spitting again and saving the value
    
    /* below 2 lines are same as the upper line
    const fon2 = domain[0];
    console.log(fon2);
    */
    console.log(domain);
    await page.locator('input#username').fill(domain);
    // await page.pause();
    console.log("printing done");
});
