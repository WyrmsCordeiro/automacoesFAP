import { test, expect } from '@playwright/test';

test("login com credenciais validas", async ({ page }) => {
await page.goto("https://locatorlab-testes.vercel.app/login");
await page.locator("#email").fill("wyrmsc@gmail.com")
await page.locator("#password").fill("wyrms123456789")
await expect(page.getByRole("button", {name: "Entrar"})).toBeEnabled()
await page.getByRole("button", {name: "Entrar"}).click()
await expect(page).toHaveTitle('Dashboard · LocatorLab');
})

test("submit de login via Enter", async ({ page }) => {
await page.goto("https://locatorlab-testes.vercel.app/login");
await page.locator("#email").fill("wyrmsc@gmail.com");
await expect(page.locator("#email")).toHaveValue("wyrmsc@gmail.com"); //Usado para confirmar se um elemento possui valor específico!
await page.locator("#password").fill("wyrms123456789");
await expect(page.locator("#password")).toHaveValue("wyrms123456789");//Usado para confirmar se um elemento possui valor específico!
await page.locator("#password").press("Enter"); // Testando o submit
await expect(page).toHaveURL("https://locatorlab-testes.vercel.app/dashboard"); //Usado para validar a URL!
});

test("upload de foto", async ({ page }) => {
await page.goto("https://locatorlab-testes.vercel.app/login");
await page.locator("#email").fill("wyrmsc@gmail.com");
await page.locator("#password").fill("wyrms123456789");
await page.locator("#password").press("Enter");
await expect(page).toHaveURL("https://locatorlab-testes.vercel.app/dashboard"); //Usado para validar a URL!
await page.getByTestId('user-menu-name').click();
await page.getByTestId('user-menu-profile').click();
await expect(page).toHaveURL("https://locatorlab-testes.vercel.app/profile");
await page.getByTestId('profile-avatar-input').setInputFiles('C:\\Users\\Aluno\\Downloads\\peixe.webp');
await page.getByRole("button", { name: "Enviar imagem" }).click();
await expect(page.getByText(/Avatar atualizado com sucesso./i)).toBeVisible(); //Usado para confirmar se um elemento está visível para o usuário!
});