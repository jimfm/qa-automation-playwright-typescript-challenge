import Menu from '../lib/components/menu';
import InventoryPage from '../lib/pages/Inventory';


import { test, expect } from '@playwright/test';
import { setLoginSession } from '../lib/utils/session';

test.describe('Menu', () => {

    test.beforeEach(async ({page}) => {
        await setLoginSession(page, 'standard_user', 'www.saucedemo.com');
    });

    test('menu item click', async ({page}) => {
        // const inventoryPage = new InventoryPage(page);
        const menu = new Menu(page);
        const inventoryPage = new InventoryPage(page);

        await inventoryPage.visit();
        await menu.clickMenu();

        const sidebarLink = await page.getByTestId("inventory-sidebar-link");
        await expect(sidebarLink).toBeVisible();
        
    });

    test('visit menu items (About page)', async ({page}) => {   
        const inventoryPage = new InventoryPage(page);
        const menu = new Menu(page);

        await inventoryPage.visit();
        await menu.clickMenu();

        const sidebarLink = await page.getByTestId("inventory-sidebar-link");
        await expect(sidebarLink).toBeVisible();
        
        await menu.clickMenuItem('about-sidebar-link');
        await expect(page).toHaveURL('https://saucelabs.com/');
    });
});
