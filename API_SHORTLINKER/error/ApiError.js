class ApiError extends Error{
    constructor(status, message) {
        super(message);
        this.status = status
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }
}

module.exports = ApiError