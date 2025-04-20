import { Page, expect } from '@playwright/test'; 

import BasePage from './Base';
import Menu from '../components/menu';

export default class LoginPage extends BasePage {

    private readonly usernameField = this.page.getByTestId("username");
    private readonly passwordField = this.page.getByTestId("password");
    private readonly loginButton = this.page.getByTestId("login-button");

    constructor(page: Page) {
        super(page, '/');
    }

    public async login(username: string, password: string): Promise<void> {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);        
        await this.loginButton.click();
    }

    public async getErrorMessage(): Promise<string> {
        const errorMessage = this.page.getByTestId('error');
        await expect(errorMessage).toBeVisible();
        return await errorMessage.innerText();
    }

    async logout(menu: Menu): Promise<void> {
        await menu.clickMenu();
        await menu.clickMenuItem('logout-sidebar-link');
        await this.visit();
    }
}
