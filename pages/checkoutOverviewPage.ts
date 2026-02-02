import { Page, Locator, expect } from "@playwright/test";
import { ItemElement } from "./elements/itemElement";

export class CheckoutOverviewPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly finishButton: Locator;
  readonly itemPriceLabel: Locator;
  readonly totalPriceLabel: Locator;
  readonly itemQuantity: Locator;
  readonly inventoryItem: ItemElement;

  constructor(page: Page) {
    this.page = page;
    this.pageTitle = page.locator('[data-test="title"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.itemPriceLabel = page.locator('[data-test="subtotal-label"]');
    this.totalPriceLabel = page.locator('[data-test="total-label"]');
    this.itemQuantity = page.locator('[data-test="item-quantity"]');
    this.inventoryItem = new ItemElement(
      page.locator('[data-test="inventory-item"]'),
    );
  }

  async open() {
    await this.page.goto("/checkout-step-two.html");
  }

  async checkPageContentIsVisible() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.finishButton).toBeVisible();
    await expect(this.totalPriceLabel).toBeVisible();
  }

  async getItemPriceText() {
    return this.itemPriceLabel.textContent();
  }

  async clickFinish() {
    await this.finishButton.click();
  }

  async getItemQuantityText() {
    return this.itemQuantity.textContent();
  }
}
