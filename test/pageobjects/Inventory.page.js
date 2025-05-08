const { $ } = require('@wdio/globals');
const Page = require('./page');

class InventoryPage extends Page {
    /**
     * Define selectors
     */
    get inventoryItems() {
        return $$('.inventory_item');
    }

    get cartBadge() {
        return $('.shopping_cart_badge');
    }

    get backpackAddToCartBtn() {
        return $('[data-test="add-to-cart-sauce-labs-backpack"]');
    }

    get bikeLightAddToCartBtn() {
        return $('[data-test="add-to-cart-sauce-labs-bike-light"]');
    }

    get boltShirtAddToCartBtn() {
        return $('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    }

    get fleeceJacketAddToCartBtn() {
        return $('[data-test="add-to-cart-sauce-labs-fleece-jacket"]');
    }

    get onesieAddToCartBtn() {
        return $('[data-test="add-to-cart-sauce-labs-onesie"]');
    }

    get testAllThingsShirtAddToCartBtn() {
        return $('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]');
    }

    /**
     * Add an item to the cart by product name
     */
    async addItemToCart(product) {
        const selectors = {
            backpack: this.backpackAddToCartBtn,
            bikeLight: this.bikeLightAddToCartBtn,
            boltShirt: this.boltShirtAddToCartBtn,
            fleeceJacket: this.fleeceJacketAddToCartBtn,
            onesie: this.onesieAddToCartBtn,
            testAllThingsShirt: this.testAllThingsShirtAddToCartBtn
        };

        const button = selectors[product];
        if (!button) throw new Error(`No such product selector: ${product}`);
        await button.click();
    }

    /**
     * Get cart count
     */
    async getCartCount() {
        if (await this.cartBadge.isExisting()) {
            return parseInt(await this.cartBadge.getText(), 10);
        }
        return 0;
    }

    /**
     * Page URL path
     */
    open() {
        return super.open('inventory.html');
    }
}

module.exports = new InventoryPage();
