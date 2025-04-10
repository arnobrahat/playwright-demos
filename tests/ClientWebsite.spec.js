const { test, expect } = require('@playwright/test');

test ("Website login", async({page})=>{

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"

    await page.goto ("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill('anshika@gmail.com');
    await page.locator("#userPassword").fill('Iamking@000');
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');
    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    const count = await products.count();
    for (let i=0; i<count; ++i){
        if(await products.nth(i).locator("b").textContent() === productName){
            await products.nth(i).locator("text = Add to Cart").click();
            console.log(i + " = " + productName);
            break;
        }
    }

    //Verifying the item in the cart
    await page.locator("[routerlink*='cart']").click(); //partial attribute selection using regular expression
    await page.locator("div li").first().waitFor(); // this will wait for the first locator to be visible
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    // Filling the checkout information
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind"); // this method types the inputs one by one.
    
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionCount = await dropdown.locator("button").count();
    for (let i=0; i<optionCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() == "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }
    await page.pause();
    
});


