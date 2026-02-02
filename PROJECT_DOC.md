## Test Architecture

### Page Object Model (POM)
The framework follows the **Page Object Model (POM)** design pattern, which promotes reusability and maintainability by separating page-specific logic from test cases. Each page class:
- Encapsulates locators and methods for interacting with a specific page.
- Provides a clean API for tests to interact with the application.

**Example: `InventoryPage`**
```ts
export class InventoryPage {
  readonly page: Page;
  readonly cartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
  }

  async open() {
    await this.page.goto("/inventory.html");
  }

  async checkPageContentIsVisible() {
    await expect(this.cartButton).toBeVisible();
  }
}
```

### Test Design
Tests are written using Playwright's `test` API and are organized by feature. Each test:
- Focuses on a single user flow or functionality.
- Uses page objects to interact with the application.
- Includes assertions to verify expected outcomes.

**Example: Test for adding an item to the cart**
```ts
test("user can add an item to the cart", async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.open();
  await inventoryPage.checkPageContentIsVisible();

  const backPackItem = inventoryPage.getItemByName(InventoryItemNames.BACKPACK);
  await backPackItem.addToCartButton.click();
  await inventoryPage.checkThatCartHasItems(1);
});
```

### Authentication Setup
The framework uses Playwright's `storageState` feature to manage authentication for different user roles. The `auth.setup.ts` file generates authentication states for users and saves them in JSON files under `playwright/.auth/`.

**Example: Authentication setup for `standard_user`**
```ts
setup(`authenticate as standard_user`, async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(ENV.STANDARD_USER, ENV.PASSWORD);
  await page.context().storageState({ path: "playwright/.auth/standard_user.json" });
});
```

### CI/CD Integration
The framework is integrated with GitHub Actions for continuous testing. The workflow file `.github/workflows/playwright.yml` defines steps to install dependencies, run tests, and upload reports.

---


## Design Patterns

### 1. **Page Object Model (POM)**
   - Encapsulates page-specific logic and locators in dedicated classes.
   - Promotes reusability and reduces code duplication.

### 2. **Data-Driven Testing**
   - Constants like `InventoryItemNames` and `ERROR_MESSAGES` are defined in `utils/constants.ts` to ensure consistency and facilitate data-driven testing.

### 3. **Environment Configuration**
   - Environment variables are managed using `dotenv` and loaded in `utils/env.ts`. This allows the framework to adapt to different environments (e.g., staging, production).

### 4. **Modular Test Setup**
   - Authentication states are modularized in `auth.setup.ts`, enabling tests to reuse pre-authenticated sessions.

---

## Assumptions and Limitations

### Assumptions
1. **Stable Application**: The framework assumes that the application under test is stable and that locators do not change frequently.
2. **Test Data**: The framework assumes that the test data (e.g., user credentials, inventory items) is valid and consistent.
3. **Environment Variables**: The `.env` file contains all required environment variables, such as `BASE_URL` and user credentials.

### Limitations
1. **Hardcoded Locators**: Some locators are hardcoded, which may require updates if the application's DOM structure changes.
2. **Limited Browser Coverage**: The framework primarily targets Chromium-based browsers. Additional configuration is needed for Firefox and WebKit.
3. **Error Handling**: The framework does not include robust error recovery mechanisms for unexpected application states.
4. **Scalability**: While the framework supports parallel execution, it may require optimization for large-scale test suites.

---