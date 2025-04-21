import { test, expect } from '@playwright/test';

import CheckoutStepTwoPage from '../lib/pages/CheckoutStepTwo';
import { setLoginSession } from '../lib/utils/session';
import { users } from '../lib/config/credentials';
import { inventory } from '../lib/config/inventory';


test.describe('Checkout Page 2', () => {

    let checkoutStepTwoPage: CheckoutStepTwoPage;

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, 'standard_user', 'www.saucedemo.com');
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.visit();
    });

    test('verify checkout page title', async ({page}) => {
        const pageTitle = await checkoutStepTwoPage.getCategoryTitle();
        expect(pageTitle).toBe('Checkout: Overview');
    });
});

test.describe('Checkout Page (Total Pricing)', () => {
    
    let checkoutStepTwoPage: CheckoutStepTwoPage;

    const taxRate = 0.08; // 8% tax rate

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.visit();
    });

    test('verify total price', async ({page}) => {
        
        // Set items in cart 
        const backpack = inventory.backpack;        
        await checkoutStepTwoPage.injectItemToCart(page, backpack.itemNum);
        await page.reload();

        const totalPrice = await checkoutStepTwoPage.getItemSubtotal(); // Pass the appropriate index
        expect(totalPrice).toContain(backpack.price.toString());

        const tax = await checkoutStepTwoPage.calculateTax(backpack.price, taxRate);
        const taxValue = await checkoutStepTwoPage.getTaxValue();

        expect(taxValue).toContain(tax.toFixed(2));

        const total = backpack.price + tax;
        const totalValue = await checkoutStepTwoPage.getTotalValue();

        expect(totalValue).toContain(total.toFixed(2));
    });

    test('verify multiple items total price (finds bug)', async ({page}) => {
        
        // Set items in cart 
        const backpack = inventory.backpack;   
        const bike = inventory.bikeLight;
        const tShirt = inventory.boltShirt;
        const fleece = inventory.fleeceJacket;

        await checkoutStepTwoPage.injectItemToCart(page, backpack.itemNum);
        await checkoutStepTwoPage.injectItemToCart(page, bike.itemNum);
        await checkoutStepTwoPage.injectItemToCart(page, tShirt.itemNum);
        await checkoutStepTwoPage.injectItemToCart(page, fleece.itemNum);
        await page.reload();

        const totaledPrice = backpack.price + bike.price + tShirt.price + fleece.price;

        const totalPrice = await checkoutStepTwoPage.getItemSubtotal(); // Pass the appropriate index
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight)); // view the error
        expect(totalPrice).toEqual(`Item total: $${totaledPrice.toFixed(2)}`);
        
        

        const tax = await checkoutStepTwoPage.calculateTax(totaledPrice, taxRate);
        const taxValue = await checkoutStepTwoPage.getTaxValue();

        expect(taxValue).toContain(tax);

        const total = totaledPrice + tax;
        const totalValue = await checkoutStepTwoPage.getTotalValue();

        expect(totalValue).toContain(total.toFixed(2));
    });
});

test.describe('Checkout Page (Submit)', () => {
    
    let checkoutStepTwoPage: CheckoutStepTwoPage;

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, users.standard_user.username, 'www.saucedemo.com');
        checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        await checkoutStepTwoPage.visit();
    });

    test('submit order', async ({page}) => {
        await checkoutStepTwoPage.clickFinishButton();
        const pageTitle = await checkoutStepTwoPage.getCategoryTitle();
        expect(pageTitle).toBe('Checkout: Complete!');
    });

    test('cancel order', async ({page}) => {
        await checkoutStepTwoPage.clickCancelButton();
        const pageTitle = await checkoutStepTwoPage.getCategoryTitle();
        expect(pageTitle).toBe('Products');
    });
})
