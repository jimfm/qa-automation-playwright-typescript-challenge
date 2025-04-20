import { test, expect } from '@playwright/test';

import CheckoutStepOnePage from '../lib/pages/CheckoutStepOne';
import { setLoginSession } from '../lib/utils/session';


test.describe('Checkout Page', () => {

    let checkoutStepOnePage: CheckoutStepOnePage;

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, 'standard_user', 'www.saucedemo.com');
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.visit();
    });

    test('verify checkout page title', async ({page}) => {
        const pageTitle = await checkoutStepOnePage.getCategoryTitle();
        expect(pageTitle).toBe('Checkout: Your Information');
    });
});

test.describe('Checkout Page (Error Handling)', () => {
    
    let checkoutStepOnePage: CheckoutStepOnePage;

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, 'standard_user', 'www.saucedemo.com');
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.visit();
    });

    test('error checkout with empty form', async ({page}) => {
        await checkoutStepOnePage.clickContinueButton();
        const errorMessage = await checkoutStepOnePage.getErrorMessage();
        expect(errorMessage).toBe('Error: First Name is required');
    });
});

test.describe('Checkout Page (Form Submission)', () => {
    
    let checkoutStepOnePage: CheckoutStepOnePage;

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, 'standard_user', 'www.saucedemo.com');
        checkoutStepOnePage = new CheckoutStepOnePage(page);
        await checkoutStepOnePage.visit();
    });

    test('checkout with valid form', async ({page}) => {
        
        await checkoutStepOnePage.fillForm('John', 'Doe', '12345');
        await checkoutStepOnePage.submitForm();

        const pageTitle = await checkoutStepOnePage.getCategoryTitle();
        expect(pageTitle).toBe('Checkout: Overview');
    });
})