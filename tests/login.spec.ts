import { test, expect } from '@playwright/test';
test("login com credenciais validas", async ({page}) =>{

await page.goto ("https://www.saucedemo.com/")
})

import {
  USERS,
  CHECKOUT_INFO,
  PRODUCTS,
  login,
  loginAsStandardUser,
  addProductToCart,
  openCart,
  fillCheckoutInfo,
  getProductPrices,
} from './helpers';

test.describe('SauceDemo - Funcionalidades principais', () => {
  // Caso 1: Login com usuário bloqueado (validação de mensagem de erro)
  test('CT01 - login com usuario bloqueado exibe mensagem de erro', async ({ page }) => {
    await login(page, USERS.lockedOut.username, USERS.lockedOut.password);

    await expect(page.locator('[data-test="error"]')).toContainText('locked out');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  // Caso 2: Logout pelo menu lateral (navegação + interação)
  test('CT02 - logout retorna para a tela de login', async ({ page }) => {
    await loginAsStandardUser(page);

    await page.locator('#react-burger-menu-btn').click();
    await page.locator('[data-test="logout-sidebar-link"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  // Caso 3: Ordenação de produtos por preço (validação de resultado)
  test('CT03 - ordenar produtos por preco do menor para o maior', async ({ page }) => {
    await loginAsStandardUser(page);

    await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

    const prices = await getProductPrices(page);
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  // Caso 4: Adicionar e remover produtos do carrinho
  test('CT04 - adicionar produtos ao carrinho e remover um deles', async ({ page }) => {
    await loginAsStandardUser(page);

    await addProductToCart(page, PRODUCTS.backpack);
    await addProductToCart(page, PRODUCTS.bikeLight);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

    await openCart(page);
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(2);

    await page.locator(`[data-test="remove-${PRODUCTS.bikeLight}"]`).click();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(1);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack',
    );
  });

  // Caso 5: Fluxo completo de compra (navegação entre várias páginas)
  test('CT05 - finalizar compra com sucesso', async ({ page }) => {
    await loginAsStandardUser(page);

    await addProductToCart(page, PRODUCTS.backpack);
    await openCart(page);

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await fillCheckoutInfo(page, CHECKOUT_INFO);
    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(
      'Sauce Labs Backpack',
    );

    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText(
      'Thank you for your order!',
    );
  });
})

