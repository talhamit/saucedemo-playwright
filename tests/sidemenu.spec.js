import { test, expect } from '@playwright/test';
import { sauceLogin } from './utils/login';


test.beforeEach(async ({page})=>{

	await page.goto('https://www.saucedemo.com/');
	await sauceLogin(page,'standard_user' ,'secret_sauce');

 })


test('Verify Inventory Page', async ({page}) => {

	 await expect(page).toHaveURL(/inventory/);
	 await expect(page.locator('.title')).toHaveText('Products');
})

/* SideMenu Section */


test('Verify SideMenu Button', async ({page}) => {

	await expect(page.locator('#react-burger-menu-btn')).toBeVisible();

})

test('Verify Menu button Click', async ({page}) => {
	await page.click('#react-burger-menu-btn');
	await expect(page.locator('.bm-item-list')).toBeVisible();
})

test('Verify All Items Link', async ({page}) => {
	await page.click('#react-burger-menu-btn');
	await expect(page.locator('a#inventory_sidebar_link')).toHaveAttribute('href',/#/);
})


test('Verify About Link', async ({page}) => {
	await page.click('#react-burger-menu-btn');
	 const link = page.locator('a#about_sidebar_link');
	 await expect(link).toBeVisible();
	await expect(link).toHaveAttribute('href','https://saucelabs.com/');
	//await expect(link).toHaveURL('https://saucelabs.com/')
})

test('Verify Logout Link', async ({page}) => {
	await page.click('#react-burger-menu-btn');
	 const link = page.locator('a#logout_sidebar_link');
	await expect(link).toHaveAttribute('href','#');
	await link.click();
	await expect(page).toHaveURL('https://www.saucedemo.com')
})

test('Verify App Reset State', async ({page}) =>{

	await page.click('#react-burger-menu-btn');
	const link = page.locator('#reset_sidebar_link');
	await expect(link).toBeVisible();
	await expect(link).toHaveAttribute('href','#');
})

test('Verify Close sidemenu by click btn', async ({page}) => {
	await page.click('#react-burger-menu-btn');
	await expect(page.locator('.bm-item-list')).toBeVisible();
	await page.click('#react-burger-cross-btn');
	await expect(page.locator('.bm-item-list')).toBeHidden();
})



// test('Verify All links of SideMenu', async ({page}) =>{
// 	const link = page.locator('nav a');
// 	await expect(link).toHaveCount(4);
// 	for(let i=0; i < link.count(); i++){
// 		await expect(link.nth(i)).toBeVisible();
// 		await expect(link.nth(i)).toHaveAttribute('href')
// 	}
// })

