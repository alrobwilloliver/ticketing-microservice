import { CustomError } from './CustomError'

export class NotAuthorizedError extends CustomError {
    statusCode = 401;
    constructor() {
        super()
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }
    serializeError() {
        return [{ message: 'Not authorized' }]
    }
}
