export const signUpFormNegativeCases = [
    {
        description: 'empty field - "Name" is required',
        modifyData: wrongData => delete wrongData.name,
        field: 'input#signupName',
        errorText: 'Name required',
        focus: true,
    },
    {
        description: 'wrong data - "Name" is invalid',
        modifyData: wrongData => wrongData.name = '12345678',
        field: 'input#signupName',
        errorText: 'Name is invalid'
    },
    {
        description: 'wrong length - "Name" has to be from 2 to 20 characters long',
        modifyData: wrongData => {
            for (const name of ['a', 'very long name for test field']) {
                wrongData.name = name;
            }
        },
        field: 'input#signupName',
        errorText: 'Name has to be from 2 to 20 characters long'
    },
    {
        description: 'empty field - "Last name" is required',
        modifyData: wrongData => delete wrongData.lastName,
        field: 'input#signupLastName',
        errorText: 'Last name required',
        focus: true,
    },
    {
        description: 'wrong data - "Last name" is invalid',
        modifyData: wrongData => wrongData.lastName = '12345678',
        field: 'input#signupLastName',
        errorText: 'Last name is invalid'
    },
    {
        description: 'wrong length - "Last name" has to be from 2 to 20 characters long',
        modifyData: wrongData => {
            for (const lastName of ['a', 'very long name for test field']) {
                wrongData.lastName = lastName;
            }
        },
        field: 'input#signupLastName',
        errorText: 'Last name has to be from 2 to 20 characters long'
    },
    {
        description: 'empty field - "Email" is required',
        modifyData: wrongData => delete wrongData.email,
        field: 'input#signupEmail',
        errorText: 'Email required',
        focus: true
    },
    {
        description: 'wrong data - "Email" is invalid',
        modifyData: wrongData => wrongData.email = '12345678',
        field: 'input#signupEmail',
        errorText: 'Email is incorrect'
    },
    {
        description: 'empty field - "Password" is required',
        modifyData: wrongData => delete wrongData.password,
        field: 'input#signupPassword',
        errorText: 'Password required',
        focus: true
    },
    {
        description: 'wrong length for "Password"',
        modifyData: wrongData => wrongData.password = '12345678',
        field: 'input#signupPassword',
        errorText: 'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    },
    {
        description: 'empty field - "Re-enter password" is required',
        modifyData: wrongData => delete wrongData.reEnterPassword,
        field: 'input#signupRepeatPassword',
        errorText: 'Re-enter password required',
        focus: true
    },
    {
        description: 'passwords do not match',
        modifyData: wrongData => {
            wrongData.reEnterPassword = 'Notmatchpass1!';
        },
        field: 'input#signupRepeatPassword',
        errorText: 'Passwords do not match',
        unFocus: true
    }
];
