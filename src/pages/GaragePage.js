import {expect} from '@playwright/test';


class GaragePage {
    constructor (page) {
        this.page = page;
    }

    async openPage () {
        await this.page.goto('/panel/garage')
    }

    getAddCarButton () {
        return this.page.getByRole('button', { name: 'Add car' });
    }

    async getCarTitle () {
        return this.page.locator('.car_name.h2').innerText();
    }

    async fillCarForm (brand, model, mileage) {
        await this.page.getByLabel('Brand').selectOption(brand);
        await this.page.getByLabel('Model').selectOption(model);
        await this.page.getByLabel('Mileage').fill(mileage);
    }

    async addCar (brand, model, mileage) {
        await this.getAddCarButton().click();
        await this.fillCarForm(brand, model, mileage);
        await this.page.getByRole('button', { name: 'Add' }).click();
    }

    async editCar (brand, model, mileage) {
        await this.page.locator('.car_edit.btn.btn-edit').click();
        await this.fillCarForm(brand, model, mileage);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('dialog').waitFor({state: 'hidden'});
    }

    async removeCar () {
        await this.page.locator('.car_edit.btn.btn-edit').click();
        await this.page.getByRole('button', { name: 'Remove car' }).click();
        await expect(this.page.getByRole('dialog')).toBeVisible();
        await this.page.getByRole('button', { name: 'Remove' }).click();
        await expect(this.page.getByText('You don’t have any cars in your garage')).toBeVisible();
    }
}


export default GaragePage;
