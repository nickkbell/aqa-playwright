/*
import {test} from '../src/fixtures/userGaragePage';
import {expect} from '@playwright/test';
import GaragePage from '../src/pages/GaragePage';


const cars = [
    { brand: 'BMW', model: 'X5', mileage: '123' },
    { brand: 'Audi', model: 'Q7', mileage: '468' },
    { brand: 'Ford', model: 'Focus', mileage: '666' },
    { brand: 'Porsche', model: '911', mileage: '784' }
];

for ( const car of cars ) {
    test(`try to add ${car.brand} ${car.model} - should pass`, async ({ page, addCar}) => {
        const {brand, model, mileage} = car;

        await addCar({ brand, model, mileage });
        await expect(await new GaragePage(page).getCarTitle()).toEqual(`${brand} ${model}`);
    });
}

test('try to edit car - should pass', async ({ page, addCar }) => {
    const [bmw, audi] = cars;
    const garagePage = new GaragePage(page);

    await addCar(bmw);
    await expect(await garagePage.getCarTitle()).toEqual(`${bmw.brand} ${bmw.model}`);
    await garagePage.editCar(audi.brand, audi.model, audi.mileage);
    await expect(await garagePage.getCarTitle()).toEqual(`${audi.brand} ${audi.model}`);
});
*/
