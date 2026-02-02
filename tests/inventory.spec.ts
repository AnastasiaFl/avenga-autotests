import { test, expect } from "@playwright/test";
import { InventoryPage } from "../pages/inventoryPage";
import { SortOptions } from "../utils/constants";

test.use({ storageState: "playwright/.auth/standard_user.json" });

test("inventory page shows items with descriptions", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();
  const count = await inventoryPage.inventoryItem.count();
  expect(count).toEqual(6);

  const firstItem = inventoryPage.getItemAt(0);
  await expect(firstItem.root).toBeVisible();
  await expect(firstItem.name).toBeVisible();
  await expect(firstItem.desc).toBeVisible();
  await expect(firstItem.price).toBeVisible();

  const price = await firstItem.price.textContent();

  expect(price).not.toBeNull();
  expect(parseFloat(price!.replace("$", ""))).toBeGreaterThan(0);
});

test("user can remove item from inventory", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const firstItem = inventoryPage.getItemAt(0);
  await firstItem.addToCartButton.click();
  await firstItem.removeFromCart();

  await expect(firstItem.addToCartButton).toHaveText("Add to cart");
});

test("user can sort items in inventory", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();
  const initialItemNames = await inventoryPage.getAllItemNamesAndPrices();

  // Sort by Name A → Z
  const sortedAscNames = [...initialItemNames].sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? ""),
  );
  await inventoryPage.selectSortOption(SortOptions.NAME_ASC);
  let firstItem = inventoryPage.getItemAt(0);
  if (sortedAscNames[0].name) {
    await expect(firstItem.name).toHaveText(sortedAscNames[0].name);
  }

  // Sort by Name Z → A
  const sortedDescNames = [...initialItemNames].sort().reverse();
  await inventoryPage.selectSortOption(SortOptions.NAME_DESC);
  firstItem = inventoryPage.getItemAt(0);
  if (sortedDescNames[0].name) {
    await expect(firstItem.name).toHaveText(sortedDescNames[0].name);
  }

  // Sort by Price Low → High
  const sortedAscPrices = [...initialItemNames].sort((a, b) => {
    const priceA = parseFloat((a.price ?? "0").replace("$", ""));
    const priceB = parseFloat((b.price ?? "0").replace("$", ""));
    return priceA - priceB;
  });
  await inventoryPage.selectSortOption(SortOptions.PRICE_ASC);
  firstItem = inventoryPage.getItemAt(0);
  if (sortedAscPrices[0].name) {
    await expect(firstItem.name).toHaveText(sortedAscPrices[0].name);
  }

  // Sort by Price High → Low
  const sortedDescPrices = [...initialItemNames].sort((a, b) => {
    const priceA = parseFloat((a.price ?? "0").replace("$", ""));
    const priceB = parseFloat((b.price ?? "0").replace("$", ""));
    return priceB - priceA;
  });
  await inventoryPage.selectSortOption(SortOptions.PRICE_DESC);
  firstItem = inventoryPage.getItemAt(0);
  if (sortedDescPrices[0].name) {
    await expect(firstItem.name).toHaveText(sortedDescPrices[0].name);
  }
});
