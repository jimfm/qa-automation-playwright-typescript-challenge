import { test, expect } from '@playwright/test';

import { setLoginSession } from '../lib/utils/session';
import { users } from '../lib/config/credentials';

import LoginPage from '../lib/pages/Login';
import CartPage from "../lib/pages/Cart";
import InventoryPage from '../lib/pages/Inventory';
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

        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');
    });

    test('End to End Test', async ({page}) => {
        // Step 1: Login
        await loginPage.visit();
        await loginPage.login(users.standard_user.username, users.standard_user.password);
        expect(await inventoryPage.getCategoryTitle()).toBe('Products');

        // Step 2: Add an item to cart
        await inventoryPage.addItemToCart('sauce-labs-backpack');
        expect(await inventoryPage.getCartBadgeCount()).toBe("1");

        // Step 3: Go to cart
        await inventoryPage.goToCart();
        expect(await cartPage.getCategoryTitle()).toBe('Your Cart');

        // Step 4: Go to checkout
        await cartPage.clickCheckoutButton();
        expect(await checkoutStepOnePage.getCategoryTitle()).toBe('Checkout: Your Information');

        // Step 5: Fill in checkout form
        await checkoutStepOnePage.fillForm('John', 'Doe', '12345');
        await checkoutStepOnePage.submitForm();
        
        expect(await checkoutCompletePage.getCategoryTitle()).toBe('Checkout: Overview');

        // Step 6: Finish checkout
        await checkoutStepTwoPage.clickFinishButton();
        expect(await checkoutCompletePage.getCategoryTitle()).toBe('Checkout: Complete!');
        
        // Step 7: Verify order completion
        await checkoutCompletePage.clickBackHomeButton();
        expect(await inventoryPage.getCategoryTitle()).toBe('Products');
    });
});