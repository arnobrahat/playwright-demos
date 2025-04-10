import {test, expect} from '@playwright/test';
//const { test, expect } = require('@playwright/test');

test ("Handling Calender", async({page})=>{

    const month = "6";
    const date = "15";
    const year = "2022"

    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator(".react-date-picker__inputGroup").click();
    

})