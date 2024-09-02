import { test, expect } from '@playwright/test';


const validUserData = {
    name: 'John',
    lastName: 'Snow',
    email: `aqa_${Date.now()}@gmail.com`,
    password: 'Password123!',
    reEnterPassword: 'Password123!'
};

const validateField = async (page, field, text) => {
    const element = await page.locator(field);
    await expect(element).toHaveCSS('border-color', 'rgb(220, 53, 69)');

    const feedback = await page.locator('.invalid-feedback').first();
    await expect(feedback).toBeVisible();
    await expect(feedback).toContainText(text);

    const footerButton = await page.locator('div.modal-footer button.btn-primary');
    await expect(footerButton).toBeDisabled();
};

const fillSignUpForm = async (page, userData) => {
    if ( userData.name ) {
        await page.locator('input#signupName').fill(userData.name);
    }

    if (userData.lastName ) {
        await page.locator('input#signupLastName').fill(userData.lastName);
    }

    if ( userData.email ) {
        await page.locator('input#signupEmail').fill(userData.email);
    }

    if ( userData.password ) {
        await page.locator('input#signupPassword').fill(userData.password);
    }

    if ( userData.reEnterPassword ) {
        await page.locator('input#signupRepeatPassword').fill(userData.reEnterPassword);
    }
};

test('register user with valid data', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign up' }).click();
    await fillSignUpForm(page, validUserData);
    await page.getByRole('button', { name: 'Register' }).click();

    await expect(await page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    await expect(page).toHaveURL(/\/panel\/garage/);
});

test.describe('validate registration form - negative cases', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Sign up' }).click();
    });

    test.describe('validate field "Name"', () => {
        const wrongData = {...validUserData};

        test('empty field - "Name" is required', async ({page}) => {
            delete wrongData.name;

            await page.locator('input#signupName').focus();
            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupName', 'Name required');
        });

        test('wrong data - "Name" is invalid', async ({page}) => {
            wrongData.name = '12345678'

            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupName', 'Name is invalid');
        });

        test('wrong length - "Name" has to be from 2 to 20 characters long', async ({page}) => {
            for ( const name of ['a', 'very long name for test field'] ) {
                wrongData.name = name;

                await fillSignUpForm(page, wrongData);
                await validateField(page, 'input#signupName', 'Name has to be from 2 to 20 characters long');
            }
        });
    });

    test.describe('validate field "Last name"', () => {
        const wrongData = {...validUserData};

        test('empty field - "Last name" is required', async ({page}) => {
            delete wrongData.lastName;

            await page.locator('input#signupLastName').focus();
            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupLastName', 'Last name required');
        });

        test('wrong data - "Last name" is invalid', async ({page}) => {
            wrongData.lastName = '12345678'

            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupLastName', 'Last name is invalid');
        });

        test('wrong length - "Name" has to be from 2 to 20 characters long', async ({page}) => {
            for ( const lastName of ['a', 'very long name for test field'] ) {
                wrongData.lastName = lastName;

                await fillSignUpForm(page, wrongData);
                await validateField(page, 'input#signupLastName', 'Last name has to be from 2 to 20 characters long');
            }
        });
    });

    test.describe('validate field "Email"', () => {
        const wrongData = {...validUserData};

        test('empty field - "Email" is required', async ({page}) => {
            delete wrongData.email;

            await page.locator('input#signupEmail').focus();
            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupEmail', 'Email required');
        });

        test('wrong data - "Email" is invalid', async ({page}) => {
            wrongData.email = '12345678'

            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupEmail', 'Email is incorrect');
        });
    });

    test.describe('validate field "Password"', () => {
        const wrongData = {...validUserData};

        test('empty field - "Password" is required', async ({page}) => {
            delete wrongData.password;

            await page.locator('input#signupPassword').focus();
            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupPassword', 'Password required');
        });

        test('wrong length for "Password"', async ({page}) => {
            wrongData.password = '12345678'

            await fillSignUpForm(page, wrongData);
            await validateField(
                page,
                'input#signupPassword',
                'Password has to be from 8 to 15 characters long and contain at least' +
                ' one integer, one capital, and one small letter'
            );
        });
    });

    test.describe('validate field "Re-enter password"', () => {
        const wrongData = {...validUserData};

        test('validate field "Re-enter password"', async ({page}) => {
            delete wrongData.reEnterPassword;

            await page.locator('input#signupRepeatPassword').click();
            await fillSignUpForm(page, wrongData);
            await validateField(page, 'input#signupRepeatPassword', 'Re-enter password required');
        });

        test('passwords do not match', async ({page}) => {
            wrongData.reEnterPassword = 'Notmatchpass1!'

            await fillSignUpForm(page, wrongData);
            // missile click
            await page.getByRole('heading', { name: 'Registration' }).click();
            await validateField(page, 'input#signupRepeatPassword', 'Passwords do not match');
        });
    });
});
