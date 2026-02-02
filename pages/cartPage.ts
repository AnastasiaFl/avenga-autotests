import { Page, Locator, expect } from "@playwright/test";
import { ItemElement } from "./elements/itemElement";
import { InventoryItemNames } from "../utils/constants";

export class CartPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly inventoryItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator(
      '[data-test="continue-shopping"]',
    );
    this.inventoryItem = page.locator('[data-test="inventory-item"]');
  }

  async open() {
    await this.page.goto("/cart.html");
  }

  async checkPageContentIsVisible() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
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
}
