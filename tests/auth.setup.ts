import { test as setup, expect } from "@playwright/test";
import { ENV } from "../utils/env";
import { LoginPage } from "../pages/loginPage";

const users = [
  {
    username: ENV.STANDARD_USER,
    storageFile: "playwright/.auth/standard_user.json",
  },
  {
    username: ENV.PROBLEM_USER,
    storageFile: "playwright/.auth/user.json",
  },
  {
    username: ENV.ERROR_USER,
    storageFile: "playwright/.auth/error_user.json",
  },
  {
    username: ENV.VISUAL_USER,
    storageFile: "playwright/.auth/visual_user.json",
  },
];

users.forEach(({ username, storageFile }) => {
  setup(`authenticate as ${username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    loginPage.login(username, ENV.PASSWORD);

    await expect(page).toHaveURL("/inventory.html");

    await page.context().storageState({ path: storageFile });
  });
});
