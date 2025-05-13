const { expect } = require('@wdio/globals')
const LoginPage = require('../pageobjects/login.page')
const InventoryPage = require('../pageobjects/Inventory.page');
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

    it('TC_INV_001 - Inventory page loads correctly', async () => {
        const tcId = 'TC_INV_001';
        const description = 'Inventory page loads correctly';

        try {
            await LoginPage.login('standard_user', 'secret_sauce');
            await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html');

            // Verify that inventory items are loaded
            const items = await InventoryPage.inventoryItems;
            expect(items.length).toBeGreaterThan(0);

            // Validate that each item has title, image, price, and Add to Cart button
            for (const item of items) {
                const title = await item.$('.inventory_item_name');
                const image = await item.$('.inventory_item_img');
                const price = await item.$('.inventory_item_price');
                const addToCartBtn = await item.$('button.btn_inventory');

                await expect(title).toBeDisplayed();
                await expect(image).toBeDisplayed();
                await expect(price).toBeDisplayed();
                await expect(addToCartBtn).toBeDisplayed();
            }

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });

    it('TC_INV_002 - Add item to cart', async () => {
        const tcId = 'TC_INV_002';
        const description = 'Add item to cart';

        try {
            await LoginPage.login('standard_user', 'secret_sauce');
            await expect(browser).toHaveUrlContaining('inventory.html');

            // Click the "Add to Cart" button
            let addToCartBtn = await InventoryPage.backpackAddToCartBtn;
            await addToCartBtn.waitForExist({ timeout: 3000 });
            await addToCartBtn.click();

            // Re-fetch the new "Remove" button (it has a different selector now)
            const removeBtn = await $('[data-test="remove-sauce-labs-backpack"]');
            await removeBtn.waitForExist({ timeout: 3000 });
            const buttonText = await removeBtn.getText();
            expect(buttonText).toBe('Remove');

            // Check cart badge shows "1"
            const cartCount = await InventoryPage.getCartCount();
            expect(cartCount).toBe(1);

            results.push({ tcId, description, status: '✅ PASS' });
        } catch (error) {
            results.push({ tcId, description, status: '❌ FAIL' });
            throw error;
        }
    });
});