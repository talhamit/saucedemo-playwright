import { test, expect } from '@playwright/test';
import { sauceLogin } from './utils/login';

// test.beforeEach(async ({page}) => {
// 	await page.goto('https://www.saucedemo.com/');
// 	await sauceLogin(page,'standard_user' ,'secret_sauce');
// })


test.beforeEach(async ({page})=>{

	await page.goto('https://www.saucedemo.com/');
	await sauceLogin(page,'standard_user' ,'secret_sauce');

 })


test('Verify Page Title on Inventory Page', async ({page}) => {

	await expect(page.locator('.title')).toHaveText('Products');

})

test('Verify Items Count on Inventory Page', async ({page}) => {

	await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
})