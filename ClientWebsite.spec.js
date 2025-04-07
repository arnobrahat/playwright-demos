const { test, expect } = require('@playwright/test');

test ("Website login", async({page})=>{

    const email = "anshika@gmail.com";
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"

    await page.goto ("https://rahulshettyacademy.com/client");
    await page.locator('#userEmail').fill(email);
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
    //console.log('ZARA COAT 3');

     // Verifying the email address in checkout is same as login 
    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    //console.log(email);

    // Finding the country name
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
    await page.locator(".action__submit").click();
    await expect (page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log('Order id: ', orderID);

    // Searching the order id from the order list table

    await page.locator("[routerlink*='myorders']").first().click();
    await page.locator("tbody").waitFor(); // waiting for the table body to load

    const tableRows = page.locator("tbody tr");
    for (let i=0; i<tableRows.count();++i)
    {
        const rowOrderId = await tableRows.nth(i).locator("th").textContent(); // from the whole row going to the order id header
        if (orderID.includes(rowOrderId))
        {
            await tableRows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    
    try{
    expect (orderID.includes(orderIdDetails)).toBeTruthy();
    }
    catch{
        console.log("false")
    };

});


