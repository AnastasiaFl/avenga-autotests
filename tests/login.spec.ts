import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { ENV } from "../utils/env";
import {
  EMPTY_CREDENTIALS_ERROR_MESSAGE,
  LOCKED_OUT_ERROR_MESSAGE,
  WRONG_ERROR_MESSAGE,
} from "../utils/constants";

test("locked out user can't login'", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(ENV.LOCKED_OUT_USER, ENV.PASSWORD);
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(LOCKED_OUT_ERROR_MESSAGE);
  await loginPage.pageIsVisible();
});

test("performance glitch user can login", async ({ page }) => {
  test.setTimeout(10000);
  const loginPage = new LoginPage(page);
  await loginPage.login(ENV.PERFORMANCE_GLITCH_USER, ENV.PASSWORD);
  await expect(page).toHaveURL("/inventory.html");
});

test("user with wrong credentials can't login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(ENV.STANDARD_USER, "wrong_password");
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(WRONG_ERROR_MESSAGE);
  await loginPage.pageIsVisible();
});

test("user with empty credentials can't login", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("", "");
  await expect(loginPage.errorMessage).toBeVisible();
  await expect(loginPage.errorMessage).toHaveText(
    EMPTY_CREDENTIALS_ERROR_MESSAGE,
  );
  await loginPage.pageIsVisible();
});
