import {test, expect} from '@playwright/test';

import { users } from '../lib/config/credentials';

import LoginPage from '../lib/pages/Login';
import Menu from '../lib/components/menu';

test.describe('Login', () => {
    
    test('login with valid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.login(users.standard_user.username, users.standard_user.password);
        
        // Check redirection to inventory page
        await expect(page).toHaveURL(/.*inventory\.html/);
    });

    test('error login with locked_out_user', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.login(users.locked_out_user.username, users.locked_out_user.password);
        
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBe('Epic sadface: Sorry, this user has been locked out.');
        
        // Check we are still on login page
        await expect(page).toHaveURL("https://www.saucedemo.com/");
    });

    test('verify logout button removes session cookie', async ({page}) => {
        const loginPage = new LoginPage(page);
        const menu = new Menu(page);
        
        await loginPage.visit();
        await loginPage.login(users.standard_user.username, users.standard_user.password);
        
        // Check redirection to inventory page
        await expect(page).toHaveURL(/.*inventory\.html/);
        
        await loginPage.logout(menu);

        // Check we are back on login page
        await expect(page).toHaveURL("https://www.saucedemo.com/");

        // Check session cookie is removed
        const cookies = await page.context().cookies();
        const sessionCookie = cookies.find(cookie => cookie.name === 'session-username');
        expect(sessionCookie).toBeUndefined();
    });
});

test.describe('Login Error Handling', () => {

    test('error login with invalid credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.login(users.standard_user.username, 'invalid_password');
        
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service');
        
        // Check we are still on login page
        await expect(page).toHaveURL("https://www.saucedemo.com/");
    });

    test('error login with empty credentials', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.visit();
        await loginPage.login('', '');
        
        const errorMessage = await loginPage.getErrorMessage();
        await expect(errorMessage).toBe('Epic sadface: Username is required');
        
        // Check we are still on login page
        await expect(page).toHaveURL("https://www.saucedemo.com/");
    });
   
});