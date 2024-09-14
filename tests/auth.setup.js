import { test as setup, expect } from '@playwright/test';
import 'dotenv/config';
import LoginForm from '../src/pages/components/LoginForm';
import GaragePage from '../src/pages/GaragePage';
import {AUTH_FILE_PATH} from '../src/constants';


setup('login', async ({ page }) => {
    const loginForm = new LoginForm(page);

    await loginForm.openPage();
    await loginForm.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);
    await expect(new GaragePage(page).getAddCarButton()).toBeVisible();
    await page.context().storageState({ path: AUTH_FILE_PATH });
});
