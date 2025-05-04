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
| TC006        | Login with only password filled        | 1. Leave username blank. Enter password. Click "Login"                       | Error message for email field                            | Negative               |
| TC007        | SQL Injection attempt                  | 1. Enter `' OR 1=1 --` in username/password                                  | Login should fail or be sanitized, show "Invalid credentials" | Security               |
| TC008        | XSS in login fields                    | 1. Enter `<script>alert(1)</script>` in username or password                 | Input sanitized; script not executed                     | Security               |
| TC009        | Browser "Back" after logout            | Login > Logout > Press back button                                        | Should redirect to login page                            | Security               |
| TC010        | Username case-insensitivity            | Enter username in any case                                                | Login should treat email as case-insensitive             | Usability              |
| TC011        | Login while already logged in (another tab) | Log in twice in different tabs                                       | Session handled correctly                                | Session Management     |
