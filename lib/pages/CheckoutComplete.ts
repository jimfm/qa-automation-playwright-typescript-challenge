import { Page } from '@playwright/test';

import BasePage from "./Base";

export default class CheckoutCompletePage extends BasePage {

    private readonly completeHeader = this.page.getByTestId('header_complete');
    private readonly completeText = this.page.getByTestId('complete-text');
    private readonly backHomeButton = this.page.getByTestId('back-to-products');

    constructor(page: Page) {
        super(page, '/checkout-complete.html');
    }

    public async getCompleteHeader(): Promise<string> {
        return await this.completeHeader.innerText();
    }

    public async getCompleteText(): Promise<string> {
        return await this.completeText.innerText();
    }
    public async clickBackHomeButton(): Promise<void> {
        await this.backHomeButton.click();
    }
}