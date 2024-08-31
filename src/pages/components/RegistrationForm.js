class RegistrationForm {
    static nameField = 'input#signupName';

    constructor (page) {
        this.page = page;
    }

    async openSignUpForm () {
        await this.page.goto('/');
        await this.page.getByRole('button', { name: 'Sign up' }).click();
    }

    async focusOnField (field) {
        await this.page.locator(field).focus();
    }

    async removeFocus (field) {
        await this.page.locator(field).blur();
    }

    async fillName ( name ) {
        await this.page.locator('input#signupName').fill(name);
    }

    async fillLastName ( lastName ) {
        await this.page.locator('input#signupLastName').fill(lastName);
    }

    async fillEmail ( email ) {
        await this.page.locator('input#signupEmail').fill(email);
    }

    async fillPassword ( password ) {
        await this.page.locator('input#signupPassword').fill(password);
    }

    async fillReEnterPassword ( password ) {
        await this.page.locator('input#signupRepeatPassword').fill(password);
    }

    async clickRegisterButton () {
        await this.page.getByRole('button', { name: 'Register' }).click();
    }

    async fillSignUpForm (userData) {
        const actions = [
            { value: userData.name, action: this.fillName.bind(this) },
            { value: userData.lastName, action: this.fillLastName.bind(this) },
            { value: userData.email, action: this.fillEmail.bind(this) },
            { value: userData.password, action: this.fillPassword.bind(this) },
            { value: userData.reEnterPassword, action: this.fillReEnterPassword.bind(this) },
        ];

        for (const { value, action } of actions) {
            if (value !== null && value !== undefined) {
                await action(value);
            }
        }
    }
}

export default RegistrationForm;