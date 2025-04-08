import {test, expect} from '@playwright/test';

test ('Usage of getByLabel locator and use of UI Runner', async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    // when any text is written inside the Label tag, we can direct to that point using the getByLabel locator
    await page.getByLabel("Check me out if you Love IceCreams!").click(); //click for checkboxed
    await page.getByLabel("Employed").check(); //check for radio button
    await page.getByLabel("Gender").selectOption("Female"); // selectOption is only valid when the options are within the select tag
})


// playwrite runner is opned when the below command is given in the terminal
//npx playwright test GetByLabelandUI-Runner.spec.js --ui    