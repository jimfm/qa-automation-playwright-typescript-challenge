
import { Page } from "@playwright/test";

export default abstract class BasePage {
    
    baseUrl: string;
    path: string;
    page: Page;

    constructor(page: Page, path: string) {
        this.page = page;
        this.baseUrl = process.env.UI_BASE_URL || 'http://localhost:3000';
        this.path = path;
    }

    public async visit() : Promise<void> {
        await this.page.goto(this.baseUrl + this.path);
    }

    public async getCategoryTitle() : Promise<string> {
        return await this.page.getByTestId('title').innerText();
    }

    // This method is used to inject an item into the cart by modifying local storage
    // Only for testing purposes to add an item without going through the UI
    public async injectItemToCart(page: Page, itemNumber: number): Promise<void> {
        await page.evaluate((itemNumber) => {
            const cart = JSON.parse(localStorage.getItem('cart-contents') || '[]');
            if (!cart.includes(itemNumber)) {
              cart.push(itemNumber);
            }
            localStorage.setItem('cart-contents', JSON.stringify(cart));
          }, itemNumber);
    }
}