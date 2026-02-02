import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutInfoPage } from "../pages/checkoutInfoPage";
import {
  ERROR_FIRST_NAME_MESSAGE,
  ERROR_LAST_NAME_MESSAGE,
  ERROR_POSTAL_CODE_MESSAGE,
  USER_NAME,
  USER_LAST_NAME,
  POSTAL_CODE,
  InventoryItemNames,
} from "../utils/constants";

test.use({ storageState: "playwright/.auth/standard_user.json" });

test("user can't checkout with empty cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  await inventoryPage.clickOnCart();

  const cartPage = new CartPage(page);
  await cartPage.checkPageContentIsVisible();

  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutInfoPage(page);
  await checkoutPage.checkPageContentIsVisible();
});

test("user can't continue checkout with missing info", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const backPackItem = inventoryPage.getItemByName(InventoryItemNames.BACKPACK);
  await backPackItem.addToCartButton.click();

  await inventoryPage.checkThatCartHasItems(1);
  await inventoryPage.clickOnCart();

  const cartPage = new CartPage(page);
  await cartPage.checkPageContentIsVisible();

  await cartPage.clickCheckout();

  const checkoutPage = new CheckoutInfoPage(page);
  await checkoutPage.checkPageContentIsVisible();

  await checkoutPage.clickContinue();
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toHaveText(ERROR_FIRST_NAME_MESSAGE);

  await checkoutPage.fillCheckoutInfo(USER_NAME, "", POSTAL_CODE);
  await checkoutPage.clickContinue();
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toHaveText(ERROR_LAST_NAME_MESSAGE);

  await checkoutPage.fillCheckoutInfo(USER_NAME, USER_LAST_NAME, "");
  await checkoutPage.clickContinue();
  await expect(checkoutPage.errorMessage).toBeVisible();
  await expect(checkoutPage.errorMessage).toHaveText(ERROR_POSTAL_CODE_MESSAGE);
});

test("user can't add same item twice to cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const backPackItem = inventoryPage.getItemByName(InventoryItemNames.BACKPACK);
  await backPackItem.addToCartButton.click();
  await inventoryPage.checkThatCartHasItems(1);
  await backPackItem.addToCartButton.click(); 

  await inventoryPage.checkCartIsEmpty();
});
