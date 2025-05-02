# swaglabs-appium-tests
Automated UI tests for Swag Labs using Appium.

This repo is for personal learning purposes

Site:https://www.saucedemo.com

IMPORTANT COMMANDS
npx wdio run wdio.conf.js
npx wdio run wdio.conf.js --watch
npx wdio run wdio.conf.js --spec ./test/specs/test.e2e.js

Login Feature Test Cases

| Test Case ID | Test Scenario                         | Test Steps                                                                 | Expected Result                                         | Test Type              |
|--------------|----------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------|------------------------|
| TC001        | Login with valid credentials           | 1. Open login page. Enter valid email & password. Click "Login"           | User successfully logged in and redirected to dashboard  | Positive               |
| TC002        | Login with invalid password            | 1. Enter valid email. Enter wrong password. Click "Login"                 | Error message: "Invalid credentials"                     | Negative               |
| TC003        | Login with unregistered email          | 1. Enter non-existent email. Enter any password. Click "Login"            | Error message: "Account not found"                       | Negative               |
| TC004        | Login with empty fields                | 1. Leave username and password blank. Click "Login"                       | Error message: "Email and password are required"         | Negative               |
| TC005        | Login with only username filled        | 1. Enter username. Leave password blank. Click "Login"                    | Error message for password field                         | Negative               |
| TC006        | Login with only password filled        | 1. Leave email blank. Enter password. Click "Login"                       | Error message for email field                            | Negative               |
| TC007        | Login with username containing spaces  | 1. Enter username with spaces                                             | Spaces trimmed, login succeeds                           | Boundary               |
| TC008        | SQL Injection attempt                  | 1. Enter `' OR 1=1 --` in email/password                                  | Login should fail or be sanitized, show "Invalid credentials" | Security               |
| TC009        | XSS in login fields                    | 1. Enter `<script>alert(1)</script>` in email or password                 | Input sanitized; script not executed                     | Security               |
| TC010        | Rate limit after failed logins         | Attempt login 5+ times with wrong password                                | Account locked or CAPTCHA triggered                      | Security / Stress      |
| TC011        | Session timeout after inactivity       | Login > Wait 15 mins > Perform action                                     | Redirected to login; session expired                     | Functional             |
| TC012        | Browser "Back" after logout            | Login > Logout > Press back button                                        | Should redirect to login page                            | Security               |
| TC013        | Password max length                    | Enter 256+ character password                                             | Input accepted or limited to max allowed                 | Boundary               |
| TC014        | Username case-insensitivity            | Enter username in any case                                                | Login should treat email as case-insensitive             | Usability              |
| TC015        | Login while already logged in (another tab) | Log in twice in different tabs                                       | Session handled correctly                                | Session Management     |
| TC016        | Page load performance                  | Load login page on slow network                                           | Page loads in under 2 seconds                            | Performance            |
| TC017        | Localization of errors                 | Change language, enter invalid creds                                      | Errors shown in selected language                        | Internationalization   |
