// === ENUMS ===
export enum InventoryItemNames {
  BACKPACK = "Sauce Labs Backpack",
  BIKE_LIGHT = "Sauce Labs Bike Light",
  T_SHIRT = "Sauce Labs Bolt T-Shirt",
}

export enum SortOptions {
  NAME_ASC = "az",
  NAME_DESC = "za",
  PRICE_ASC = "lohi",
  PRICE_DESC = "hilo",
}

// === CONSTANTS ===
// === ERROR MESSAGES ===
export const WRONG_ERROR_MESSAGE = "Epic sadface: Username and password do not match any user in this service";
export const LOCKED_OUT_ERROR_MESSAGE = "Epic sadface: Sorry, this user has been locked out.";
export const EMPTY_CREDENTIALS_ERROR_MESSAGE = "Epic sadface: Username is required";
export const ERROR_FIRST_NAME_MESSAGE = "Error: First Name is required";
export const ERROR_LAST_NAME_MESSAGE = "Error: Last Name is required";
export const ERROR_POSTAL_CODE_MESSAGE = "Error: Postal Code is required";

// === USER DATA ===
export const USER_NAME = "John";
export const USER_LAST_NAME = "Doe";
export const POSTAL_CODE = "12345";