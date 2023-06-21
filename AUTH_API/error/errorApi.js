class ErrorApi extends Error{
    constructor(status, message) {
        super(message);
        this.status = status
    }

    static unAuthorizedError(){
        return new ErrorApi(401, 'Користувач не авторизований')
    }
    static badRequest(message = []) {
        return new ErrorApi(404, message)
    }
}

module.exports = ErrorApi