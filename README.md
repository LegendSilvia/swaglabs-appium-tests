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


Login Feature Test Cases

| Test Case ID | Test Scenario                         | Test Steps                                                                 | Expected Result                                         | Test Type              |
|--------------|----------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------|------------------------|
| TC001        | Login with valid credentials           | 1. Open login page. Enter valid email & password. Click "Login"           | User successfully logged in and redirected to dashboard  | Positive               |
| TC002        | Login with invalid password            | 1. Enter valid email. Enter wrong password. Click "Login"                 | Error message: "Invalid credentials"                     | Negative               |
| TC003        | Login with unregistered email          | 1. Enter non-existent email. Enter any password. Click "Login"            | Error message: "Account not found"                       | Negative               |
| TC004        | Login with empty fields                | 1. Leave username and password blank. Click "Login"                       | Error message: "Email and password are required"         | Negative               |
| TC005        | Login with only username filled        | 1. Enter username. Leave password blank. Click "Login"                    | Error message for password field                         | Negative               |
| TC006        | Login with only password filled        | 1. Leave email blank. Enter password. Click "Login"                       | Error message for email field                            | Negative               |
| TC007        | SQL Injection attempt                  | 1. Enter `' OR 1=1 --` in email/password                                  | Login should fail or be sanitized, show "Invalid credentials" | Security               |
| TC008        | XSS in login fields                    | 1. Enter `<script>alert(1)</script>` in email or password                 | Input sanitized; script not executed                     | Security               |
| TC009        | Rate limit after failed logins         | Attempt login 5+ times with wrong password                                | Account locked or CAPTCHA triggered                      | Security / Stress      |
| TC010        | Session timeout after inactivity       | Login > Wait 15 mins > Perform action                                     | Redirected to login; session expired                     | Functional             |
| TC011        | Browser "Back" after logout            | Login > Logout > Press back button                                        | Should redirect to login page                            | Security               |
| TC012        | Password max length                    | Enter 256+ character password                                             | Input accepted or limited to max allowed                 | Boundary               |
| TC013        | Username case-insensitivity            | Enter username in any case                                                | Login should treat email as case-insensitive             | Usability              |
| TC014        | Login while already logged in (another tab) | Log in twice in different tabs                                       | Session handled correctly                                | Session Management     |
| TC015        | Page load performance                  | Load login page on slow network                                           | Page loads in under 2 seconds                            | Performance            |
| TC016        | Localization of errors                 | Change language, enter invalid creds                                      | Errors shown in selected language                        | Internationalization   |
