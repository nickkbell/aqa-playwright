import { test, expect } from '@playwright/test';
import RegistrationForm from '../src/pages/components/RegistrationForm';
import {validUserData} from '../src/constants';
import {signUpFormNegativeCases} from '../src/fixtures';


test('register user with valid data', async ({ page }) => {
    const registrationForm = new RegistrationForm(page);

    await registrationForm.openSignUpForm();
    await registrationForm.fillSignUpForm(validUserData);
    await registrationForm.clickRegisterButton();

    await expect(await page.getByRole('heading', { name: 'Garage' })).toBeVisible();
    await expect(page).toHaveURL(/\/panel\/garage/);
});

test.describe('validate registration form - negative cases', () => {
    let wrongData;
    let registrationForm;

    test.beforeEach(async ({page}) => {
        wrongData = {...validUserData};
        registrationForm = new RegistrationForm(page);
        await registrationForm.openSignUpForm();
    });

    for (const item of signUpFormNegativeCases) {
        const { description, modifyData, field, errorText, focus, unFocus } = item;

        test(description, async ({ page }) => {
            modifyData(wrongData);

            if (focus) {
                await registrationForm.focusOnField(field);
            }

            await registrationForm.fillSignUpForm(wrongData);

            if (unFocus) {
                await registrationForm.removeFocus(field);
            }

            const feedback = await page.locator('.invalid-feedback').first();

            await expect(feedback).toBeVisible();
            await expect(feedback).toContainText(errorText);
            await expect(page.locator(field)).toHaveCSS('border-color', 'rgb(220, 53, 69)');
            await expect(page.locator('div.modal-footer button.btn-primary')).toBeDisabled();
        });
    }
});
