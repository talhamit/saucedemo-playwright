import { test, expect } from '@playwright/test';
import { sauceLogin } from './utils/login';
import { addToCart } from './utils/inventory';

// test.beforeEach(async ({page}) => {
// 	await page.goto('https://www.saucedemo.com/');
// 	await sauceLogin(page,'standard_user' ,'secret_sauce');
// })


test.beforeEach(async ({page})=>{

	await page.goto('https://www.saucedemo.com/');
	await sauceLogin(page,'standard_user' ,'secret_sauce');

 })


test('Verify Page Title on Inventory Page', async ({page}) => {

	//await expect(page.locator('.title')).toHaveText('Products');
	await expect(page).toHaveTitle('Swag Labs');


})

test('Verify Items Count on Inventory Page', async ({page}) => {

	await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);
})

test('Verify First Item Name on Inventory Page', async ({page}) =>{
	await expect(page.locator('[data-test="inventory-item-name"]')
		.first()).toHaveText('Sauce Labs Backpack')
})

test('Verify Last Item Name on Inventory Page', async ({page}) => {
	await expect(page.locator('[data-test="inventory-item-name"]')
		.last()).toHaveText('Test.allTheThings() T-Shirt (Red)')
})

test('Verify Inventory Items have Image', async ({page}) =>{

	const invList = page.locator('[data-test="inventory-item"]');
	console.log('here now');
	let imgCount = await invList.count();
	const invImage= invList.locator('img.inventory_item_img');
	await expect(invImage).toHaveCount(imgCount);

})

test('Verify Inventory Items have Images', async ({page}) => {
		const invList = page.locator('[data-test="inventory-item"]');
		const invCount = await invList.count();

		for(let i=1; i < invCount; i++){
			await expect(invList.nth(i).locator('img.inventory_item_img')).toBeVisible()
		}
})

test('Verify Inventory Items have Price', async ({page}) => {
		const invList = page.locator('[data-test="inventory-item"]');
		const invCount = await invList.count();
		for(let i=1; i < invCount; i++){
			await expect(invList.nth(i).locator('[data-test="inventory-item-price"]')).toBeVisible()
		}

})

test('Verify Inventory Items have Description', async ({page}) => {
		const invList = page.locator('[data-test="inventory-item"]');
		const invCount = await invList.count();
		for(let i=1; i < invCount; i++){
			await expect(invList.nth(i).locator('[data-test="inventory-item-desc"]')).toBeVisible()
		}

})

test('Verify Inventory Items have Add to Cart Button', async ({page}) => {

		const invList = page.locator('[data-test="inventory-item"]');
		const invCount = await invList.count();
		for(let i=1; i < invCount; i++){
			await expect(invList.nth(i).locator('button.btn_inventory')).toBeVisible();
			await expect(invList.nth(i).locator('button.btn_inventory')).toHaveText('Add to cart');
		}
})

test('Verify Inventory Item have Remove Button after Adding to Cart', async ({page}) =>{
	await addToCart(page, 0);

	const button = page
    .locator('[data-test="inventory-item"]')
    .nth(0)
    .locator('.btn_inventory');

  await expect(button).toHaveText('Remove');

})

test('Verify Cart after Adding to Cart item',async ({page}) =>{
	await addToCart(page, 0);

	const button = page
    .locator('[data-test="inventory-item"]')
    .nth(0)
    .locator('.btn_inventory');

  await expect(button).toHaveText('Remove');

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
})

test('Verifing Add All Items to Cart' , async ({page}) => {

	const invList = page.locator('[data-test="inventory-item"]');
	const invCount = await invList.count();

	for(let i=0; i < invCount; i++){
		await addToCart(page, i)
	}
	await expect(page.locator('.shopping_cart_badge')).toHaveText(`${invCount}`);

})

test('Verifing Remove All Items to Cart' , async ({page}) => {

	const invList = page.locator('[data-test="inventory-item"]');
	const invCount = await invList.count();

/////now add to cart all items

	for(let i=0; i < invCount; i++){
		await addToCart(page, i)
	}
	await expect(page.locator('.shopping_cart_badge')).toHaveText(`${invCount}`);

////now remove from cart all item

	for(let i=0; i < invCount; i++){
		await addToCart(page, i)
	}
	//await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();
	await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
})

test('Verify Sorting Items by Name A to Z',async ({page}) => {

	await page.locator('[data-test="product-sort-container"]').selectOption('az');
		await expect(page.locator('[data-test="inventory-item-name"]')
		.first()).toHaveText('Sauce Labs Backpack')

		await expect(page.locator('[data-test="inventory-item-name"]')
		.last()).toHaveText('Test.allTheThings() T-Shirt (Red)')
})

test('Verify Sorting Items by Name Z to A',async ({page}) => {

	await page.locator('[data-test="product-sort-container"]').selectOption('za');
		await expect(page.locator('[data-test="inventory-item-name"]')
		.last()).toHaveText('Sauce Labs Backpack')

		await expect(page.locator('[data-test="inventory-item-name"]')
		.first()).toHaveText('Test.allTheThings() T-Shirt (Red)')
})

test('Verify Sorting Items by Price Low to High', async ({page}) => {
		await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

		await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText("$7.99")
})


test('Verify Sorting Items by High to Low', async ({page}) => {
		await page.locator('[data-test="product-sort-container"]').selectOption('hilo');

		await expect(page.locator('[data-test="inventory-item-price"]').first()).toHaveText("$49.99")
})

//////////////First item
test('Verify click on a product name navigate to the product detail page and back to inventory page',async ({page}) =>{

	const itemName = await page.locator('[data-test="inventory-item-name"]').first().innerText();

		console.log(itemName);
	await page.locator('[data-test="inventory-item-name"]').first().click();

	await expect(page).toHaveURL(/inventory-item/);

	const iName = await page.locator('[data-test="inventory-item-name"]').innerText();

	await expect(iName).toBe(itemName);


})