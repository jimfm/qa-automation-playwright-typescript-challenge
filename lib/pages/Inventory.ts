import { Page } from "@playwright/test";

import BasePage from "./Base";

export default class InventoryPage extends BasePage {

    private readonly cartButton = this.page.getByTestId("shopping-cart-link");
    private readonly cartBadge = this.page.locator('.shopping_cart_badge');

    constructor(page: Page) {
        super(page, '/inventory.html');
    }

    public async addItemToCart(itemName : String): Promise<void> {
        const item = this.page.getByTestId(`add-to-cart-${itemName}`);
        await item.click();
    }

    public async removeItemFromCart(itemName : String): Promise<void> {
        const item = this.page.getByTestId(`remove-${itemName}`);
        await item.click();
    }

    public async goToCart(): Promise<void> {
        await this.cartButton.click();
    }

    public async getCartBadgeCount(): Promise<string | null> {
        const cartBadge = await this.page.locator('.shopping_cart_badge');
        const count = await cartBadge.count();
        if (count === 0) {
            return null; // not present
          }
        return await this.cartBadge.innerText();
    }

    public async chooseSort(sortType: string): Promise<void> {
        const sortButton = this.page.getByTestId('product-sort-container');
        await sortButton.selectOption(sortType);
    }

}