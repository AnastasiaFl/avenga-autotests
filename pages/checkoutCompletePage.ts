import {Page, Locator, expect} from '@playwright/test';

export class CheckoutCompletePage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly thankYouMessage: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.thankYouMessage = page.locator('.complete-header');
        this.backHomeButton = page.locator('[data-test="back-to-products"]');
    }

    async open() {
        await this.page.goto('/checkout-complete.html');
    }

    async checkPageContentIsVisible() {
        await expect(this.pageTitle).toBeVisible();
        await expect(this.thankYouMessage).toBeVisible();
        await expect(this.backHomeButton).toBeVisible();
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }
}