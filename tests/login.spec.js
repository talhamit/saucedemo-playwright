import { test, expect } from '@playwright/test';
import { sauceLogin } from './utils/login';


const errorMsg = "[data-test='error']";

test.beforeEach(async ({page}) =>{
  await page.goto('https://www.saucedemo.com/');
})


test('Verify Login Page', async ({page}) => {

  await expect(page.locator('.login_logo')).toHaveText('Swag Labs');

})

test('Login with Valid Credentials', async ({ page }) => {

  await sauceLogin(page, 'standard_user' ,'secret_sauce');
  await expect(page).toHaveURL(/inventory/);
});

test('Login with invalid credentials', async ({page}) =>{

  await sauceLogin(page,'invalid_standard_user','invalid_secret_sauce');
  await expect(page.locator("[data-test='error']"))
  .toHaveText('Epic sadface: Username and password do not match any user in this service')
})



test('Login with locked_out_user', async ({page}) => {

  await sauceLogin(page,'locked_out_user','secret_sauce');
  await expect(page.locator(errorMsg)).toHaveText('Epic sadface: Sorry, this user has been locked out.')

})



