/**
 * Wraps the resolve redirect error and enriches it with the current url that caused the error
 */
class ResolveRedirectError extends Error {
    constructor(message, statusCode, currentUrl = null) {
        super(message);
        this.statusCode = statusCode;
        this.currentUrl = currentUrl;
    }
}

module.exports = ResolveRedirectError;