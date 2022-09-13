export enum PasswordErrorCodes {
    TOO_SHORT,
}

export const validatePassword = (pass: string) => {
    const err = new Error();
    err.name = "InvalidPassword";

    let isValid = true;

    if (pass.length < 6) {
        err.message = "Password must contain at least 6 characters";

        isValid = false;
    }

    if (!isValid) {
        throw err;
    }

    return true;
};
