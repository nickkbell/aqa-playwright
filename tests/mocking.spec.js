import { test, expect, request } from '@playwright/test';


test('task 1: mocking data for profile page', async ({ page }) => {
    await page.route('**/api/users/profile', async route => {
        const json = {
            status: 'ok',
            data: {
                userId: 135612,
                photoFilename: 'default-user.png',
                name: 'mocking',
                lastName: 'test'
            }
        };

        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(json)
        });
    });

    await page.goto('/panel/profile');

    await expect(page.getByText('mocking test')).toBeVisible();
});

test.describe('task 2: create cars', () => {
    const requestUrl = '/api/cars';
    const carData = {
        carBrandId: 1,
        carModelId: 1,
        mileage: 122
    };
    let apiRequestContext;

    test.beforeEach(async () => {
        apiRequestContext = await request.newContext();
    });

    test('create car - should pass', async ( {page} ) => {
        const response = await apiRequestContext.post(requestUrl, {
            data: carData
        });

        const status = response.status();
        const data = await response.json();

        await expect(status).toBe(201);
        await expect(data.data.carBrandId).toBe(1);
        await expect(data.data.carModelId).toBe(1);
        await expect(data.data.mileage).toBe(122);
        await expect(data.data.brand).toBe('Audi');
        await expect(data.data.model).toBe('TT');
    });

    test('create car with invalid brand - should fail', async ({ page }) => {
        const response = await apiRequestContext.post(requestUrl, {
            data: {...carData, carBrandId: 'invalid'}
        });

        const status = response.status();
        const data = await response.json();

        await expect(status).toBe(400);
        await expect(data.message).toBe('Invalid car brand type');
    });

    test('create car with invalid model - should fail', async ({ page }) => {
        const response = await apiRequestContext.post(requestUrl, {
            data: {...carData, carModelId: 'invalid'}
        });

        const status = response.status();
        const data = await response.json();

        await expect(status).toBe(400);
        await expect(data.message).toBe('Invalid car model type');
    });

    test('create car with invalid mileage - should fail', async ({ page }) => {
        const response = await apiRequestContext.post(requestUrl, {
            data: {...carData, mileage: 'invalid'}
        });

        const status = response.status();
        const data = await response.json();

        await expect(status).toBe(400);
        await expect(data.message).toBe('Invalid mileage type');
    });
});
