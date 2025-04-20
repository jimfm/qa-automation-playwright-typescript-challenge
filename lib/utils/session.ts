import { Page } from '@playwright/test';

export async function setLoginSession(page: Page, username: string, domain: string) : Promise<void> {

    await page.context().addCookies([{
        name: 'session-username',
        value: username,
        domain: domain,  // or your actual domain
        path: '/',
        httpOnly: false,
        secure: true,
        sameSite: 'None',
      }]);

    await page.reload(); // reload the page to apply the cookie
}


export async function clearLoginSession(page: Page) {
    const cookies = await page.context().cookies();
    for (const cookie of cookies) {
        if (cookie.name === 'session-username') {
            await page.context().clearCookies();
        }
    }
}

