class apiError extends Error {
    constructor(
        statusCode,
        message = "Oops, Something went wrong. Have a cup of Coffe we'll fix it in a while.",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            message: this.message,
            errors: this.errors,
            success: this.success
        };
    }
}

export { apiError };
