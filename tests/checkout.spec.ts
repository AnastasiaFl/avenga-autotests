import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutInfoPage } from "../pages/checkoutInfoPage";
import { CheckoutOverviewPage } from "../pages/checkoutOverviewPage";
import { CheckoutCompletePage } from "../pages/checkoutCompletePage";
import { InventoryItemNames, POSTAL_CODE, USER_LAST_NAME, USER_NAME } from "../utils/constants";

test.use({ storageState: "playwright/.auth/standard_user.json" });

test("user can finish checkout with item in cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const backPackItem = inventoryPage.getItemByName(InventoryItemNames.BACKPACK);
  const backPackPrice = await backPackItem.price.textContent();
  await backPackItem.addToCartButton.click();

  await inventoryPage.checkThatCartHasItems(1);
  await inventoryPage.clickOnCart();

  const cartPage = new CartPage(page);
  await cartPage.checkPageContentIsVisible();
  expect(await cartPage.getItemByName(InventoryItemNames.BACKPACK).price.textContent()).toBe(
    backPackPrice,
  );

  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutInfoPage(page);
  await checkoutPage.checkPageContentIsVisible();
  await checkoutPage.fillCheckoutInfo(USER_NAME, USER_LAST_NAME, POSTAL_CODE);
  await checkoutPage.clickContinue();

  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  await checkoutOverviewPage.checkPageContentIsVisible();

  expect(await checkoutOverviewPage.inventoryItem.name.textContent()).toBe(InventoryItemNames.BACKPACK);
  expect(await checkoutOverviewPage.getItemQuantityText()).toBe("1");
  expect(await checkoutOverviewPage.getItemPriceText()).toContain(
    backPackPrice,
  );

  await checkoutOverviewPage.clickFinish();

  const checkoutCompletePage = new CheckoutCompletePage(page);
  await checkoutCompletePage.checkPageContentIsVisible();
});

test("user can checkout with multiple items in cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const backPackItem = inventoryPage.getItemByName(InventoryItemNames.BACKPACK);
  const bikeLightItem = inventoryPage.getItemByName(InventoryItemNames.BIKE_LIGHT);
  await backPackItem.addToCartButton.click();
  const backPackPriceString = await backPackItem.price.textContent();
  const backPackPrice = parseFloat(backPackPriceString?.replace('$', '') || '0');
  const bikeLightPriceString = await bikeLightItem.price.textContent();
  const bikeLightPrice = parseFloat(bikeLightPriceString?.replace('$', '') || '0');
  await bikeLightItem.addToCartButton.click();
  await inventoryPage.checkThatCartHasItems(2);
  await inventoryPage.clickOnCart();

  const cartPage = new CartPage(page);
  await cartPage.checkPageContentIsVisible();

  expect(await cartPage.getItemByName(InventoryItemNames.BACKPACK).name).toBeVisible();
  expect(
    await cartPage.getItemByName(InventoryItemNames.BIKE_LIGHT).name,
  ).toBeVisible();
  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutInfoPage(page);
  await checkoutPage.checkPageContentIsVisible();
  await checkoutPage.fillCheckoutInfo(USER_NAME, USER_LAST_NAME, POSTAL_CODE);
  await checkoutPage.clickContinue();

  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  await checkoutOverviewPage.checkPageContentIsVisible();

  const itemPriceText = await checkoutOverviewPage.getItemPriceText();
  const itemPrice = parseFloat(
    itemPriceText?.replace('Item total: $', '') || '0',
  );
  expect(itemPrice).toBeCloseTo(backPackPrice + bikeLightPrice, 2);

  await checkoutOverviewPage.clickFinish();

  const checkoutCompletePage = new CheckoutCompletePage(page);
  await checkoutCompletePage.checkPageContentIsVisible();
});

test("user can navigate back to inventory from checkout info page", async ({
  page,
}) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const backPackItem = inventoryPage.getItemByName(InventoryItemNames.BACKPACK);
  await backPackItem.addToCartButton.click();

  await inventoryPage.checkThatCartHasItems(1);
  await inventoryPage.clickOnCart();

  const cartPage = new CartPage(page);
  await expect(cartPage.getItemByName(InventoryItemNames.BACKPACK).name).toBeVisible();
  await cartPage.checkPageContentIsVisible();

  await cartPage.clickContinueShopping();

  await inventoryPage.checkPageContentIsVisible();
});


test("user can remove item from cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const backPackItem = inventoryPage.getItemByName(InventoryItemNames.BACKPACK);
  await backPackItem.addToCartButton.click();

  await inventoryPage.checkThatCartHasItems(1);
  await inventoryPage.clickOnCart();

  const cartPage = new CartPage(page);
  await expect(cartPage.getItemByName(InventoryItemNames.BACKPACK).name).toBeVisible();
  await cartPage.checkPageContentIsVisible();

  await cartPage.getItemByName(InventoryItemNames.BACKPACK).removeFromCart();

  await inventoryPage.checkCartIsEmpty();
});

test("user can manipulate cart between pages", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();
});
