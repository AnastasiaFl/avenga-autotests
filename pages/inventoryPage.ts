import { Page, Locator, expect } from "@playwright/test";
import { ItemElement } from "./elements/itemElement";
import { InventoryItemNames, SortOptions } from "../utils/constants";
import { BurgerMenu } from "./elements/burgerMenu";

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly inventoryItem: Locator;
  readonly cartBadge: Locator;
  readonly cartButton: Locator;
  readonly firstItem: ItemElement;
  readonly inventoryItemsContainer: Locator;
  readonly burgerMenuButton: Locator;
  readonly burgerMenu: BurgerMenu;
  readonly sortSelector: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.inventoryItemsContainer = page.locator(
      '[data-test="inventory-container"]',
    );

    this.firstItem = this.getItemAt(0);
    this.burgerMenuButton = page.locator("#react-burger-menu-btn");
    this.burgerMenu = new BurgerMenu(page.locator(".bm-menu-wrap"));
    this.sortSelector = page.locator('[data-test="product-sort-container"]');
  }

  async open() {
    await this.page.goto("/inventory.html");
  }

  async checkPageContentIsVisible() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.inventoryItemsContainer).toBeVisible();
  }

  getItemAt(index: number) {
    return new ItemElement(this.inventoryItem.nth(index));
  }

  getItemByName(name: InventoryItemNames) {
    return new ItemElement(
      this.inventoryItem.filter({
        has: this.page.locator(
          `[data-test="inventory-item-name"]:has-text("${name}")`,
        ),
      }),
    );
  }

  async checkCartIsEmpty() {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async checkThatCartHasItems(count: number) {
    await expect(this.cartBadge).toHaveText(count.toString());
  }

  async clickOnCart() {
    return await this.cartButton.click();
  }

  async openBurgerMenu() {
    await this.burgerMenuButton.click();
  }

  async selectSortOption(option: SortOptions) {
    await this.sortSelector.selectOption(option);
  }

  async getAllItemNamesAndPrices() {
    const itemCount = await this.inventoryItem.count();
    const itemNames = [];
    for (let i = 0; i < itemCount; i++) {
      const item = this.getItemAt(i);
      itemNames.push({
        name: await item.name.textContent(),
        price: await item.price.textContent(),
      });
    }
    return itemNames;
  }
}

