# Avenga Autotests

## Overview
This repository contains an end-to-end (E2E) test automation framework built with Playwright. The framework is designed to test the functionality of the Sauce Labs demo application.

---

## Framework Structure

### Directory Structure
The project is organized as follows:

```
.env
.gitignore
package.json
playwright.config.ts
README.md
.github/
  workflows/
    playwright.yml
pages/
  cartPage.ts
  checkoutCompletePage.ts
  checkoutInfoPage.ts
  checkoutOverviewPage.ts
  inventoryPage.ts
  loginPage.ts
  elements/
    burgerMenu.ts
    itemElement.ts
playwright/
  .auth/
playwright-report/
  index.html
  data/
  trace/
test-results/
tests/
  auth.setup.ts
  checkout.spec.ts
  checkout-negative.spec.ts
  inventory.spec.ts
  login.spec.ts
utils/
  constants.ts
  env.ts
```

### Key Components
1. **`pages/`**: Contains Page Object Model (POM) classes for each page in the application. Each page class encapsulates locators and methods for interacting with the page.
   - Example: `inventoryPage.ts` represents the inventory page, providing methods like `getItemByName` and `checkPageContentIsVisible`.

2. **`pages/elements/`**: Contains reusable components or elements that are shared across multiple pages.
   - Example: `itemElement.ts` encapsulates the structure and behavior of an inventory item.

3. **`tests/`**: Contains test files written using Playwright's `test` API. Tests are organized by feature or functionality.
   - Example: `checkout.spec.ts` tests the checkout process, while `login.spec.ts` tests login functionality.

4. **`utils/`**: Contains utility files for constants, environment variables, and other shared resources.
   - Example: `constants.ts` defines reusable enums and error messages.

5. **`playwright/`**: Contains Playwright-specific configurations, such as authentication storage files for different user roles.

6. **`playwright.config.ts`**: The main configuration file for Playwright, defining test settings, browser configurations, and project-specific options.

7. **`playwright-report/`**: Stores HTML reports generated after test execution.

8. **`.github/workflows/`**: Contains CI/CD workflows for running tests on GitHub Actions.

---


## Running Tests

To execute the tests, follow these steps:

1. **Install Dependencies**:
   Ensure all required dependencies are installed by running:
   ```bash
   npm install
   ```

2. **Run All Tests**:
   Execute all tests using the following command:
   ```bash
   npx playwright test
   ```

3. **Run Tests in UI Mode**:
   To debug tests interactively, use Playwright's UI mode:
   ```bash
   npx playwright test --ui
   ```

4. **Run Specific Tests**:
   To run a specific test file, provide the file path:
   ```bash
   npx playwright test tests/login.spec.ts
   ```

5. **Run Tests with Tags**:
   Use tags to filter tests (e.g., `@smoke`):
   ```bash
   npx playwright test --grep "@smoke"
   ```

---

## Generating Reports

Playwright automatically generates test reports after execution. To view the reports:

1. **HTML Report**:
   - After running tests, generate and open the HTML report:
     ```bash
     npx playwright show-report
     ```

2. **Trace Viewer**:
   - For debugging, use the trace viewer to analyze test execution:
     ```bash
     npx playwright show-trace <trace-file>
     ```

   - Trace files are stored in the `playwright-report/trace/` directory.

3. **Test Results**:
   - Test results are saved in the `test-results/` directory. You can inspect logs and artifacts for each test run.

---

## Reports

You can view the test reports at the following link:
[Avenga Autotests Reports](https://anastasiafl.github.io/avenga-autotests/)
