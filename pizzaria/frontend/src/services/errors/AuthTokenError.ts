export class AuthtokenError extends Error {
    constructor() {
        super("Error with authentication token")
    }
}