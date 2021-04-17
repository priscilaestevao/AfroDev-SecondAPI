class InvalidLogin extends Error {
    constructor() {
        const message = "Email or password is invalid or entered incorrectly.";
        super(message);
        this.name = "InvalidLogin";
        this.idError = 7;
    };
};

module.exports = InvalidLogin;