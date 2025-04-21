import {Page, test, expect} from '@playwright/test';
import InventoryPage from '../lib/pages/Inventory';
import { setLoginSession } from '../lib/utils/session';
import { users } from '../lib/config/credentials';

const items = [
    'sauce-labs-backpack',
    'sauce-labs-bike-light',
    'sauce-labs-bolt-t-shirt',
    'sauce-labs-fleece-jacket',
    'sauce-labs-onesie',
    'test.allthethings()-t-shirt-(red)'
]

test.describe('Inventory Page (General)', () => {
    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');
    });
    test('Verify page title', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
        const pageTitle = await inventoryPage.getCategoryTitle();
        expect(pageTitle).toBe('Products');
    });
});

test.describe('Inventory Page (Sorting)', () => {
    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');
    });

    test('sort items (A-Z)', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // Get all items
        const itemNames = await page.getByTestId("inventory-item").locator('.inventory_item_name').allInnerTexts();
        const sortedNames = itemNames.slice(); // Copy original

        sortedNames.sort((nameA, nameB) => {
            return nameA.localeCompare(nameB);
        });

        expect(itemNames).toEqual(sortedNames);
    });

    test('sort items (Z-A)', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // Choose Z-A sort
        await inventoryPage.chooseSort('za');

        // Get all items
        const itemNames = await page.getByTestId("inventory-item").locator('.inventory_item_name').allInnerTexts();
        const sortedNames = itemNames.slice(); // Copy original

        sortedNames.sort((nameA, nameB) => {
            return nameB.localeCompare(nameA); // reverse sort
        });

        expect(itemNames).toEqual(sortedNames);
    });

    test('sort items (Price Low to High)', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // Choose Price Low to High sort
        await inventoryPage.chooseSort('lohi');

        // Get all items
        const itemPrices = await page.getByTestId("inventory-item").locator('.inventory_item_price').allInnerTexts();
        const sortedPrices = itemPrices.slice(); // Copy original

        sortedPrices.sort((priceA, priceB) => {
            return parseFloat(priceA.replace('$', '')) - parseFloat(priceB.replace('$', ''));
        });

        expect(itemPrices).toEqual(sortedPrices);
    });
    
    test('sort items (Price High to Low)', async ({page}) => {  
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        // Choose Price High to Low sort
        await inventoryPage.chooseSort('hilo');

        // Get all items
        const itemPrices = await page.getByTestId("inventory-item").locator('.inventory_item_price').allInnerTexts();
        const sortedPrices = itemPrices.slice(); // Copy original

        sortedPrices.sort((priceA, priceB) => {
            return parseFloat(priceB.replace('$', '')) - parseFloat(priceA.replace('$', ''));
        });

        expect(itemPrices).toEqual(sortedPrices);
    });
});

test.describe('Inventory Page (Add Items)', () => {
    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');
    });

    test('add item to cart', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        await inventoryPage.addItemToCart(items[0]);
        const cartBadgeCount = await inventoryPage.getCartBadgeCount();
        expect(cartBadgeCount).toBe("1");

        await inventoryPage.removeItemFromCart(items[0]);
        const cartBadgeCountAfterRemoval = await inventoryPage.getCartBadgeCount();
        expect(cartBadgeCountAfterRemoval).toBeNull;
    });

    test('cart badge count (multiple items)', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        let itemCount = 1;

        for (const item of items) {
            await inventoryPage.addItemToCart(item);
            const cartBadgeCount = await inventoryPage.getCartBadgeCount();
            expect(cartBadgeCount).toBe(itemCount.toString());
            itemCount++;
        };
    });

    test('item details', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();
      
        // Check if all items are present in the inventory
        // and match description / price etc. based on the inventory.ts file
        // Unless the inventory is finite, it will not be feasible to check all items
        // every time.  Test data specifics elsewhere.
    });
});

test.describe('Inventory Page Errors (problem_user)', () => {
    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.problem_user.username, 'www.saucedemo.com');
    });

    test('add item to cart problem', async ({page}) => {
        const inventoryPage = new InventoryPage(page);
        await inventoryPage.visit();

        let itemCount = 1;

        for (const item of items) {
            await inventoryPage.addItemToCart(item);
            const cartBadgeCount = await inventoryPage.getCartBadgeCount();
            expect(cartBadgeCount).toBe(itemCount.toString());
            itemCount++;
        };
    });
});
