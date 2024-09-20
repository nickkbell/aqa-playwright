import { test as base } from '@playwright/test';
import GaragePage from '../pages/GaragePage';

export const test = base.extend({
    addCar: async ( {page}, use ) => {
        const garagePage = new GaragePage(page);

        await use(async ( car ) => {
            await garagePage.openPage();
            await garagePage.addCar(car.brand, car.model, car.mileage);
        });

        await garagePage.removeCar();
    }
});
