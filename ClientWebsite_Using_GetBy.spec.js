const { test, expect } = require('@playwright/test');

test ("Website with getByLocator", async({page})=>{

    const email = "anshika@gmail.com";
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3"

    await page.goto ("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder("enter your passsword").fill('Iamking@000');
    await page.getByRole("button",{name:"Login"}).click();

    await page.waitForLoadState('networkidle');
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).
    getByRole("button",{name:"Add To Cart"}).click();

    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

    await page.locator("div li").first().waitFor();
    expect(page.getByText("ZARA COAT 3")).toBeVisible();

    await page.getByRole("button",{name:"Checkout"}).click();

    // Finding the country name
   
    await page.getByPlaceholder("Select Country").pressSequentially("ind"); // this method types the inputs one by one.
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    expect(page.getByText("Thankyou for the order.")).toBeVisible();

    //comment out jiajkjda
    
});


