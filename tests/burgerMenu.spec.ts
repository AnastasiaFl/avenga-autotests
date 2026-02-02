import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventoryPage";
import { ENV } from "../utils/env";

test.use({ storageState: "playwright/.auth/standard_user.json" });

test("user can open and close burger menu", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();
  await inventoryPage.openBurgerMenu();

  await inventoryPage.burgerMenu.checkBurgerMenuIsVisible();
  await inventoryPage.burgerMenu.closeBurgerMenu();
});

test("user can logout via burger menu", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();
  await inventoryPage.openBurgerMenu();

  await inventoryPage.burgerMenu.logoutLink.click();
  const currentUrl = page.url();
  expect(currentUrl).toBe(ENV.BASE_URL);
});

test("user can navigate to About page via burger menu", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();
  await inventoryPage.openBurgerMenu();

  await inventoryPage.burgerMenu.aboutLink.click();
  const currentUrl = page.url();
  expect(currentUrl).toBe("https://saucelabs.com/");
});

test("user can reset app state via burger menu", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const firstItem = inventoryPage.getItemAt(0);
  await firstItem.addToCartButton.click();
  await inventoryPage.checkThatCartHasItems(1);

  await inventoryPage.openBurgerMenu();
  await inventoryPage.burgerMenu.resetAppStateLink.click();

  await inventoryPage.checkCartIsEmpty();
  await expect(firstItem.addToCartButton).toHaveText("Add to cart");
});
