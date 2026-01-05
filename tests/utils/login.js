
export async function sauceLogin (page, uname, pass){

await page.fill('#user-name', uname);
await page.fill('#password',pass);
await page.click('#login-button');

}