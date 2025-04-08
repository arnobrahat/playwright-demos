import {test, expect} from '@playwright/test';

test ('Usage of getByLabel locator and use of UI Runner', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // when any text is written inside the Label tag, we can direct to that point using the getByLabel locator
    await page.getByLabel("Check me out if you Love IceCreams!").click(); //click for checkboxed
    await page.getByLabel("Employed").check(); //check for radio button
    await page.getByLabel("Gender").selectOption("Female"); // selectOption is only valid when the options are within the select tag

    await page.getByPlaceholder("Password").fill("123456"); 
    /*
        when placeholder attribute is present, 
        use getByPlaceholder to select the element
    */

    await page.getByRole("button",{name:"Submit"}).click();
    /*
        when button tag or class name btn is present, 
        use getByRole("button") followed by the button value to select the element
    */

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    /*
        when getByText() locator is used, 
        it scans for all the texts in the page and fetch for the text mentioned.
    */

    // Navigating to the shop page
    await page.getByRole("link",{name: "Shop"}).click();
    await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();

});


// playwrite runner is opned when the below command is given in the terminal
//npx playwright test GetByLabelandUI-Runner.spec.js --ui    