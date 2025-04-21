import { Page } from '@playwright/test';

import BasePage from './Base';

export default class CheckoutStepTwoPage extends BasePage {

    private readonly finishButton = this.page.getByTestId("finish");
    private readonly cancelButton = this.page.getByTestId("cancel");


    private readonly paymentInfoValue = this.page.getByTestId("payment-info-value");
    private readonly shippingInfoValue = this.page.getByTestId("shipping-info-value");
    
    // Labels contain the same text as the values
    private readonly priceTotalValue = this.page.getByTestId("subtotal-label");
    private readonly taxValue = this.page.getByTestId("tax-label");
    private readonly totalValue = this.page.getByTestId("total-label");
    
    constructor(page: Page) {
        super(page, '/checkout-step-two.html');
    }

    public async clickFinishButton(): Promise<void> {
        await this.finishButton.click();
    }
    public async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
    }
    public async getErrorMessage(): Promise<string> {   
        const errorMessage = this.page.getByTestId('error');
        await errorMessage.waitFor();
        return await errorMessage.innerText();
    }
    public async getItemTitle(index: number): Promise<string> {  
        const ItemTitle = this.page.getByTestId('header_container');
        await ItemTitle.waitFor();
        return await ItemTitle.innerText();
    }
    public async getItemDescription(index: number): Promise<string> {    
        const itemDescription = this.page.getByTestId('item_description');
        await itemDescription.waitFor();
        return await itemDescription.innerText();
    }
    public async getItemQuantity(index: number): Promise<string> {
        const itemQuantity = this.page.getByTestId('item_quantity');
        await itemQuantity.waitFor();
        return await itemQuantity.innerText();
    }
    
    public async getItemSubtotal(): Promise<string> {
        const itemPrice = this.page.getByTestId('subtotal-label');
        await itemPrice.waitFor();
        return await itemPrice.innerText();
    }
    public async getPaymentInfoValue(): Promise<string> {
        await this.paymentInfoValue.waitFor();
        return await this.paymentInfoValue.innerText();
    }
    public async getShippingInfoValue(): Promise<string> {
        await this.shippingInfoValue.waitFor();
        return await this.shippingInfoValue.innerText();
    }
    public async getPriceTotaleValue(): Promise<string> {
        await this.priceTotalValue.waitFor();
        return await this.priceTotalValue.innerText();
    }
    public async getTaxValue(): Promise<string> {
        await this.taxValue.waitFor();
        return await this.taxValue.innerText();
    }
    public async getTotalValue(): Promise<string> {
        await this.totalValue.waitFor();
        return await this.totalValue.innerText();
    }

    public async calculateTax(price: number, taxRate: number): Promise<number> {
        return Math.ceil(price * taxRate * 100) / 100;
    }
}