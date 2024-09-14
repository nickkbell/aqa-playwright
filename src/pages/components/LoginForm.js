class LoginForm {
    constructor ( page ) {
        this.page = page;
    }

    async openPage () {
        await this.page.goto('/');
    }

    async login ( email, password ) {
        await this.page.getByRole('button', {name: 'Sign In'}).click();
        await this.page.getByLabel('Email').type(email);
        await this.page.getByLabel('Password').type(password);
        await this.page.getByRole('button', {name: 'Login'}).click();
    }
}


export default LoginForm;
