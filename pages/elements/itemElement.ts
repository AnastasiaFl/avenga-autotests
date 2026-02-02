import { Locator } from "@playwright/test";

export class ItemElement {
  readonly root: Locator;
  readonly name: Locator;
  readonly desc: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.name = root.locator('[data-test="inventory-item-name"]');
    this.desc = root.locator('[data-test="inventory-item-description"]');
    this.price = root.locator('[data-test="inventory-item-price"]');
    this.addToCartButton = root.locator('.btn');
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async removeFromCart() {
    await this.addToCartButton.click();
  }
}
