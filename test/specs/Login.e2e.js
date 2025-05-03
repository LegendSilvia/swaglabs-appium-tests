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

    it('TC001 - Login with valid credentials', async () => {
        const tcId = 'TC001';
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

    it('TC002 - Login with invalid password', async () => {
        const tcId = 'TC002';
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



    it('TC003 - Login with unregistered username', async () => {
        const tcId = 'TC003';
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

    it('TC004 - Login with empty fields', async () => {
        const tcId = 'TC004';
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

    it('TC005 - Login with only username filled', async () => {
        const tcId = 'TC005';
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

    it('TC006 - Login with only password filled', async () => {
        const tcId = 'TC006';
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
});


