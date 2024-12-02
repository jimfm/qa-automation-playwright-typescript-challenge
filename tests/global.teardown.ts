import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

async function globalTeardown() {
    console.log('Starting global teardown...');

    const browser = await chromium.launch();
    const context = await browser.newContext({
        ignoreHTTPSErrors: true,
    });

    try {
        // OPTIONAL: Helpful for removing temporary data and other features created in setup
    } catch (error) {
        console.error('Error in global teardown:', error);
    } finally {
        await context.close();
        await browser.close();
        console.log('Global teardown completed.');
    }
}

export default globalTeardown;

// Run directly and when imported
if (require.main === module) {
    globalTeardown()
        .then(() => console.log('Teardown complete'))
        .catch(console.error);
}
