import { test, expect } from '@playwright/test';

test("login com credenciais validas", async ({ page }) => {
await page.goto("https://locatorlab-testes.vercel.app/login");
await page.locator("#email").fill("wyrmsc@gmail.com") //Testando o fill
await page.locator("#password").fill("wyrms123456789")
await page.getByRole("button", {name: "Entrar"}).click() //Testando o click
})

test("submit de login via Enter", async ({ page }) => {
  await page.goto("https://locatorlab-testes.vercel.app/login");
  await page.locator("#email").fill("wyrmsc@gmail.com");
  await page.locator("#password").fill("wyrms123456789");
  await page.locator("#password").press("Enter"); // Testando o submit
  await expect(page).toHaveURL("https://locatorlab-testes.vercel.app/dashboard");
});

test("submit de login via Enter", async ({ page }) => {
  await page.goto("https://locatorlab-testes.vercel.app/login");
  await page.locator("#email").fill("wyrmsc@gmail.com");
  await page.locator("#password").fill("wyrms123456789");
  await page.locator("#password").press("Enter"); 
  await expect(page).toHaveURL("https://locatorlab-testes.vercel.app/dashboard");
  await page.getByRole("button", { name: "WA" }).click();
  await page.getByText("Meu perfil").click();
  await page.locator('input[type="file"]').setInputFiles(path.join(__dirname, "..", "arquivos", "foto.png"));
//Testando upload
});
