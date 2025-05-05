# 🚀 Automated UI Tests for Swag Labs

This repository contains automated E2E UI tests for [Swag Labs](https://www.saucedemo.com), built using **WebdriverIO** and **Appium**.  
The purpose of this project is personal learning and practice with modern UI testing tools.

---

## 🔗 Site Under Test

- **URL**: [https://www.saucedemo.com](https://www.saucedemo.com)

---

## 📦 Stack

- WebdriverIO
- Appium
- JavaScript (Node.js)
- Mocha (default WebdriverIO test runner)

---

**IMPORTANT COMMANDS**

```bash
npx wdio run wdio.conf.js
npx wdio run wdio.conf.js --watch
npx wdio run wdio.conf.js --spec ./test/specs/test.e2e.js
```


Login Page Test Cases

| **Test Case ID** | **Test Scenario**                        | **Test Steps**                                                                 | **Expected Result**                                         | **Test Type**          |
|------------------|------------------------------------------|--------------------------------------------------------------------------------|--------------------------------------------------------------|------------------------|
| TC_LOGIN_001     | Login with valid credentials             | 1. Open login page. Enter valid email & password. Click "Login"               | User successfully logged in and redirected to dashboard      | Positive               |
| TC_LOGIN_002     | Login with invalid password              | 1. Enter valid email. Enter wrong password. Click "Login"                     | Error message: "Invalid credentials"                         | Negative               |
| TC_LOGIN_003     | Login with unregistered email            | 1. Enter non-existent email. Enter any password. Click "Login"                | Error message: "Account not found"                           | Negative               |
| TC_LOGIN_004     | Login with empty fields                  | 1. Leave username and password blank. Click "Login"                           | Error message: "Email and password are required"             | Negative               |
| TC_LOGIN_005     | Login with only username filled          | 1. Enter username. Leave password blank. Click "Login"                        | Error message for password field                             | Negative               |
| TC_LOGIN_006     | Login with only password filled          | 1. Leave username blank. Enter password. Click "Login"                        | Error message for email field                                | Negative               |
| TC_LOGIN_007     | SQL Injection attempt                    | 1. Enter `' OR 1=1 --` in username/password                                   | Login should fail or be sanitized, show "Invalid credentials"| Security               |
| TC_LOGIN_008     | XSS in login fields                      | 1. Enter `<script>alert(1)</script>` in username or password                  | Input sanitized; script not executed                         | Security               |
| TC_LOGIN_009     | Browser "Back" after logout              | Login > Logout > Press back button                                            | Should redirect to login page                                | Security               |
| TC_LOGIN_010     | Username case-insensitivity              | Enter username in any case                                                   | Login should treat email as case-insensitive                 | Usability              |
| TC_LOGIN_011     | Login while already logged in (another tab) | Log in twice in different tabs                                             | Session handled correctly                                    | Session Management     |




Inventory Page Test Cases

| **Test Case ID** | **Test Scenario**                         | **Test Steps**                                                                                                                                                   | **Expected Result**                                                                 | **Test Type** |
|------------------|-------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------|---------------|
| TC_INV_001       | Inventory page loads correctly            | 1. Login with valid credentials<br>2. Go to `/inventory.html`                                                                                                   | All product cards are displayed with title, image, price, and "Add to Cart" button   | Functional    |
| TC_INV_002       | Add item to cart                          | 1. Click `button[data-test="add-to-cart-sauce-labs-backpack"]`                                                                                                  | Button changes to `Remove` and cart badge shows count `1`                            | Functional    |
| TC_INV_003       | Remove item from cart                     | 1. Click `button[data-test="remove-sauce-labs-backpack"]`                                                                                                       | Button changes to `Add to Cart` and cart badge is cleared                            | Functional    |
| TC_INV_004       | Cart persists across navigation           | 1. Add item<br>2. Navigate to `/inventory-item.html?id=4` and return<br>3. Check cart icon                                                                       | Cart badge still shows correct item count                                            | Functional    |
| TC_INV_005       | Click product image/name for details      | 1. Click on `a[id="item_4_title_link"]`                                                                                                                          | Navigated to `/inventory-item.html?id=4`                                             | Functional    |
| TC_INV_006       | Sort items by Name (A to Z)               | 1. Select "Name (A to Z)" in `select[data-test="product_sort_container"]`                                                                                       | First product title is alphabetically first                                          | Functional    |
| TC_INV_007       | Sort items by Price (low to high)         | 1. Select "Price (low to high)" from the sort dropdown                                                                                                          | First item has lowest price                                                          | Functional    |
| TC_INV_008       | Add multiple items to cart                | 1. Add two items to cart using their `data-test` selectors                                                                                                      | Cart badge shows `2`                                                                 | Functional    |
| TC_INV_009       | Product info elements visible             | 1. Verify for each product: `img`, `div.inventory_item_name`, `div.inventory_item_price`, `button` exist                                                        | All elements are present for each item                                               | UI            |
| TC_INV_010       | Inventory with empty product list         | 1. Simulate API response with empty product list (mock/override)                                                                                                 | Message: "No products available" is displayed                                        | Negative      |
| TC_INV_011       | Product with broken image URL             | 1. Mock product with bad image URL                                                                                                                              | Broken image icon or placeholder is shown                                            | Negative      |
| TC_INV_012       | XSS script injection                      | 1. Mock product name with `<script>alert(1)</script>`                                                                                                           | Script not executed; visible as plain text                                           | Security      |
| TC_INV_013       | Access inventory without login            | 1. Visit `/inventory.html` without authentication                                                                                                               | Redirected to login page                                                             | Security      |
| TC_INV_014       | Check responsive layout                   | 1. Set viewport to mobile (e.g., 375x667)<br>2. Visit inventory                                                                                                 | Products adapt to mobile grid layout                                                 | UI            |
| TC_INV_015       | Verify cart badge updates correctly       | 1. Add/remove items and observe cart icon                                                                                                                       | Badge updates in real-time                                                           | Functional    |
| TC_INV_016       | Inventory page performance                | 1. Record load time of `/inventory.html`                                                                                                                        | Page loads within acceptable threshold (e.g., < 2s)                                  | Performance   |
| TC_INV_017       | Use browser back from detail to inventory | 1. Navigate to detail page<br>2. Click browser back                                                                                                             | Inventory page shows same scroll/selection state                                     | Usability     |




