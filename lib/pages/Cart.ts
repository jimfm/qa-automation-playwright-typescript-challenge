import { Page } from '@playwright/test';

import BasePage from './Base';

export default class CartPage extends BasePage {

    private readonly cartTitle = this.page.getByTestId('cart_title');
    private readonly checkoutButton = this.page.getByTestId('checkout');

    constructor(page: Page) {
        super(page, '/cart.html');
    }

    public async getCartTitle(): Promise<string> {
        return await this.cartTitle.innerText();
    }

    public async clickCheckoutButton(): Promise<void> {
        await this.checkoutButton.click();
    }

    public async clickCancelButton(): Promise<void> {
        const cancelButton = this.page.getByTestId('continue-shopping');
        await cancelButton.click();
    }
}