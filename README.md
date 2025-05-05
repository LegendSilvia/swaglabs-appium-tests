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

| **Test Case ID** | **Test Scenario**          | **Test Steps**                                                     | **Expected Result**                                                             | **Test Type** |
| ---------------- | -------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------- | ------------- |
| TC\_INV\_001     | Inventory page loads fully | 1. Login with valid credentials<br>2. Navigate to `inventory.html` | All inventory items are visible with name, image, price, and Add to Cart button | Functional    |
| TC\_INV\_002     | Add product to shopping cart | 1. Login and go to `inventory.html`<br>2. Click "Add to Cart" for an item | Button changes to "Remove"<br>Cart icon badge count increases by 1 | Functional    |
| TC\_INV\_003     | Remove product from cart | 1. Add an item to the cart<br>2. Click "Remove" | Button changes back to "Add to Cart"<br>Cart badge count decreases | Functional    |
| TC\_INV\_004     | Sort inventory items | 1. Select "Price (low to high)" from the sort dropdown | Items are sorted by increasing price | Functional    |
| TC\_INV\_005     | Check product detail link | 1. Click on a product name or image | User is navigated to the correct product detail page | Functional    |
| TC\_INV\_006     | TBD | TBD | TBD    |




