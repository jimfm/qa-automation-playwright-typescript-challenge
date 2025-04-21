import { test, expect } from '@playwright/test';

import { setLoginSession } from '../lib/utils/session';
import { users } from '../lib/config/credentials';
import { inventory } from '../lib/config/inventory';

import LoginPage from '../lib/pages/Login';
import InventoryPage from '../lib/pages/Inventory';
import CartPage from '../lib/pages/Cart';
import CheckoutStepOnePage from '../lib/pages/CheckoutStepOne';
import CheckoutStepTwoPage from '../lib/pages/CheckoutStepTwo';
import CheckoutCompletePage from '../lib/pages/CheckoutComplete';

test.describe('End to End Test', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutStepOnePage: CheckoutStepOnePage;
    let checkoutStepTwoPage: CheckoutStepTwoPage;
    let checkoutCompletePage: CheckoutCompletePage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        checkoutCompletePage = new CheckoutCompletePage(page);

        await setLoginSession(page, users.visual_user.username, 'www.saucedemo.com');
    });

    test('Visual test - Login Page', async ({page}) => {
        await loginPage.visit();
        await expect(page).toHaveScreenshot('homepage.png');
    });

    test('Visual test - Inventory Page', async ({page}) => {
        await inventoryPage.visit();
        await expect(page).toHaveScreenshot('inventory_page.png');
    });
    
    test('Visual test - Cart Page', async ({page}) => { 
        await inventoryPage.visit();
        await inventoryPage.injectItemToCart(page, inventory.backpack.itemNum);
        await page.reload();
        await cartPage.visit();
        await expect(page).toHaveScreenshot('cart_page.png');
    });  

    test('Visual test - Checkout Step 1 Page', async ({page}) => { 
        await inventoryPage.visit();
        await inventoryPage.injectItemToCart(page, inventory.backpack.itemNum);
        await page.reload()
        await checkoutStepOnePage.visit();
        await expect(page).toHaveScreenshot('checkout_step_1_page.png');
    });

    test('Visual test - Checkout Step 2 Page', async ({page}) => { 
        await inventoryPage.visit();
        await inventoryPage.injectItemToCart(page, inventory.backpack.itemNum);
        await page.reload()
        await checkoutStepTwoPage.visit();
        await expect(page).toHaveScreenshot('checkout_step_2_page.png');
    });

    test('Visual test - Checkout Complete Page', async ({page}) => { 
        await inventoryPage.visit();
        await inventoryPage.injectItemToCart(page, inventory.backpack.itemNum);
        await page.reload()
        await checkoutCompletePage.visit();
        await expect(page).toHaveScreenshot('checkout_complete_page.png');
    });

});