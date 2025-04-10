const { test, expect } = require('@playwright/test');

test('Select Round Trip and Search Flights', async ({ page }) => {
  // 1. Navigate to the webpage
  await page.goto('https://sharetrip.net/');

  // 2. Select the Round Trip radio button
  const roundTripRadioButton = page.locator('input[name="radio-group"][value="Return"]');
  await roundTripRadioButton.check();

  // 3. Fill in Origin and Destination (using example data)
  const originInput = page.locator('input[placeholder="Flying from Airport/City"]');
  await originInput.fill('DAC'); // Example: Set the origin to DAC

  const destinationInput = page.locator('input[placeholder="Flying to Airport/City"]');
  await destinationInput.fill('BKK'); // Example: Set the origin to DAC


//   await page.locator('input[aria-label="From"]').fill("DAC"); // Example - adjust based on actual aria-label
//   await page.locator('input[aria-label="To"]').fill("CXB"); // Example - adjust based on actual aria-label

  // 4. Handle Date Pickers (This is the trickiest part - adapt to the specific date picker)
  // Example (very generic - likely needs significant modification):
  // Wait for the date picker to be clickable, and then click it
  await page.locator('button[aria-label="Open datepicker"]').click(); // Open the datepicker

  // Assuming the datepicker has some way to select the date, possibly buttons with aria-labels
  await page.locator('button[aria-label="Choose Tuesday, March 11, 2025 as your departure date."]').click();
  await page.locator('button[aria-label="Choose Thursday, March 13, 2025 as your return date."]').click();

  // 5. Click the "Search Flights" button
  await page.locator('button:has-text("Search Flights")').click();  //Example

  // 6. Add assertions here to validate that the search results are displayed
  // Example:
  // await expect(page).toHaveURL(/search-results/); // Replace /search-results/ with the actual expected URL

  // Wait for a short time to see the results (for demonstration purposes)
  await page.waitForTimeout(5000);
});
