export const isValidEmail = (email) => {

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regex.test(email);

};

export const isValidPhone = (phone) => {

    const regex = /^[6-9]\d{9}$/;

    return regex.test(phone);

};

export const isStrongPassword = (password) => {

    /*
        Minimum 8 characters
        1 Uppercase
        1 Lowercase
        1 Number
        1 Special Character
    */

    const regex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/;

    return regex.test(password);

};

export const isRequired = (value) => {

    return value && value.trim().length > 0;

};