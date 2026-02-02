import { Locator, expect } from "@playwright/test";

export class BurgerMenu {
  readonly root: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;
    readonly closeBurgerMenuButton: Locator;

  constructor(root: Locator) {
    this.root = root;
    this.allItemsLink = root.locator('[data-test="inventory-link"]');
    this.aboutLink = root.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = root.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = root.locator('[data-test="reset-sidebar-link"]');
    this.closeBurgerMenuButton = root.locator(".bm-cross-button");
  }

  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async clickAbout() {
    await this.aboutLink.click();
  }

  async clickLogout() {
    await this.logoutLink.click();
  }

  async clickResetAppState() {
    await this.resetAppStateLink.click();
  }

  async checkBurgerMenuIsVisible() {
    await expect(this.root).toBeVisible();
  }

  async closeBurgerMenu() {
    await this.closeBurgerMenuButton.click();
  }
}
