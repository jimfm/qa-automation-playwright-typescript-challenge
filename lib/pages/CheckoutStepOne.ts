import { Page } from '@playwright/test';

import BasePage from './Base';

export default class CheckoutStepOnePage extends BasePage {

    private readonly firstNameField = this.page.getByTestId('firstName');
    private readonly lastNameField = this.page.getByTestId('lastName');
    private readonly postalCodeField = this.page.getByTestId('postalCode');
    private readonly continueButton = this.page.getByTestId('continue');
    private readonly cancelButton = this.page.getByTestId('cancel');

    constructor(page: Page) {
        super(page, '/checkout-step-one.html');
    }

    public async fillForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.postalCodeField.fill(postalCode);
    }
    
    public async submitForm(): Promise<void> {
        await this.continueButton.click();
    }

    public async clickContinueButton(): Promise<void> {
        await this.continueButton.click();
    }

    public async clickCancelButton(): Promise<void> {
        await this.cancelButton.click();
    }
    public async getErrorMessage(): Promise<string> {
        const errorMessage = this.page.getByTestId('error');
        await errorMessage.waitFor();
        return await errorMessage.innerText();
    }
}