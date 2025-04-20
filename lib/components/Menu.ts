import { Page } from '@playwright/test';

export default class Menu {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async clickMenu() {
        const menuButton = this.page.locator('[class="bm-burger-button"]');
        await menuButton.click()
    }

    async closeMenu() {
        const xButton = this.page.locator('button[id="react-burger-cross-btn"]');
        await xButton.click();
    }   
    
    async clickLogout() {
        await this.clickMenuItem('logout-sidebar-link');
    }
    
    async clickMenuItem(item: string) {
        await this.page.getByTestId(item).click(); // inventory-sidebar-link
    }


}