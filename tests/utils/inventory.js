export async function addToCart(page, num) {
	
	const invList = page.locator('[data-test="inventory-item"]');
	await invList.nth(num).locator('.btn_inventory').click();

}

// function getItemName() {
// 	 await page.locator('[data-test="inventory-item-name"]');
// }