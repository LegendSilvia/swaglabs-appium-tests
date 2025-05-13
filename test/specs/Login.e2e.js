const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
// const SecurePage = require('../pageobjects/secure.page')

const results = [];

describe('Login Feature', () => {
    beforeEach(async () => {
        await LoginPage.open();
    });

    after(() => {
        // Test Summary
        console.log('\n======= ✅ Test Summary =======');
        results.forEach(r => {
            console.log(`${r.tcId} - ${r.description} : ${r.status}`);
        });
        console.log('================================\n');
    });

    it('TC_LOGIN_001 - Login with valid credentials', async () => {
        const tcId = 'TC_LOGIN_001';
        const description = 'Login with valid credentials';

        try {
            await LoginPage.login('standard_user', 'secret_sauce');
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');
            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_002 - Login with invalid password', async () => {
        const tcId = 'TC_LOGIN_002';
        const description = 'Login with invalid password';

        try {
            await LoginPage.login('standard_user', 'wrong_password');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Username and password do not match any user in this service');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            console.error(`${tcId} failed with error:`, error.message);
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });



    it('TC_LOGIN_003 - Login with unregistered username', async () => {
        const tcId = 'TC_LOGIN_003';
        const description = 'Login with unregistered username';

        try {
            await LoginPage.login('wrong_user', 'secret_sauce');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Username and password do not match any user in this service');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            console.error(`${tcId} failed with error:`, error.message);
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_004 - Login with empty fields', async () => {
        const tcId = 'TC_LOGIN_004';
        const description = 'Login with empty fields';

        try {
            await LoginPage.login('', '');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Username is required');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            console.error(`${tcId} failed with error:`, error.message);
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_005 - Login with only username filled', async () => {
        const tcId = 'TC_LOGIN_005';
        const description = 'Login with only username filled';

        try {
            await LoginPage.login('standard_user', '');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Password is required');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            console.error(`${tcId} failed with error:`, error.message);
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_006 - Login with only password filled', async () => {
        const tcId = 'TC_LOGIN_006';
        const description = 'Login with only password filled';

        try {
            await LoginPage.login('', 'secret_sauce');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Username is required');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            console.error(`${tcId} failed with error:`, error.message);
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_007 - SQL Injection attempt in login', async () => {
        const tcId = 'TC_LOGIN_007';
        const description = 'SQL Injection attempt in username and password fields';

        try {
            await LoginPage.login(' OR 1=1 --', ' OR 1=1 --');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Username and password do not match any user in this service');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            console.error(`${tcId} failed with error:`, error.message);
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_008 - XSS in login fields', async () => {
        const tcId = 'TC_LOGIN_008';
        const description = 'XSS in login fields';

        try {
            await LoginPage.login('<script>alert(1)</script>', '<script>alert(1)</script>');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Username and password do not match any user in this service');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            console.error(`${tcId} failed with error:`, error.message);
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_009 - Browser "Back" after logout', async () => {
        const tcId = 'TC_LOGIN_009';
        const description = 'Browser "Back" after logout';

        try {
            await LoginPage.login('standard_user', 'secret_sauce');
            await $('#react-burger-menu-btn').click();
            await $('#logout_sidebar_link').click();

            await browser.back();

            await expect(browser).toHaveUrl('https://www.saucedemo.com/');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_010 - Username case-insensitivity', async () => {
        const tcId = 'TC_LOGIN_010';
        const description = 'Login with mixed-case username';

        try {
            await LoginPage.login('Standard_User', 'secret_sauce');

            const errorMsg = await $('h3[data-test="error"]');

            await browser.waitUntil(
                async () => await errorMsg.isDisplayed(),
                {
                    timeout: 5000,
                    timeoutMsg: 'Error message did not appear in time'
                }
            );

            const text = await errorMsg.getText();
            // console.warn(`<<< DEBUG: Error Text: ${text} >>>`);

            await expect(errorMsg).toBeDisplayed();
            await expect(text).toContain('Epic sadface: Username and password do not match any user in this service');

            results.push({ tcId, description, status: '✅ PASS' });;
        } catch (error) {
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_LOGIN_011 - Login in multiple tabs', async () => {
        const tcId = 'TC_LOGIN_011';
        const description = 'Login while already logged in (another tab)';

        try {
            await LoginPage.login('standard_user', 'secret_sauce');

            const handlesBefore = await browser.getWindowHandles();

            // Open new tab
            await browser.newWindow('https://www.saucedemo.com');
            await LoginPage.login('standard_user', 'secret_sauce');

            // Verify session is still active in both tabs
            const currentUrl = await browser.getUrl();
            await expect(currentUrl).toContain('inventory');

            // Close new tab and switch back
            await browser.closeWindow();
            await browser.switchToWindow(handlesBefore[0]);

            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });
});