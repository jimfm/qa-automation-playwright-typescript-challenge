import { test, expect } from '@playwright/test';

import { setLoginSession } from '../lib/utils/session';
import { users } from '../lib/config/credentials';

import CartPage from "../lib/pages/Cart";

test.describe('Cart Page', () => {

    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');

        cartPage = new CartPage(page);
        await cartPage.visit();
    });

    test('verify cart page title', async ({page}) => {
        const pageTitle = await cartPage.getCategoryTitle();
        expect(pageTitle).toBe('Your Cart');
    });

    test('cancel button click', async ({page}) => {
        await cartPage.clickCancelButton();
        expect(page.url()).toMatch(/.*inventory\.html/);
    });
});


test.describe('Cart Page (Checkout process)', () => {
    
    let cartPage: CartPage;

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');
        cartPage = new CartPage(page);
        await cartPage.visit();
    });

    test('checkout button', async ({page}) => {
        await cartPage.clickCheckoutButton();
        expect(page.url()).toMatch(/.*checkout-step-one\.html/);
    });
});

