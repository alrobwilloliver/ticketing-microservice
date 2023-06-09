import { CustomError } from './CustomError'
export class NotFoundError extends CustomError {
    statusCode = 404;
    constructor() {
        super()
        // Object.setPrototypeOf(this, NotFoundError.prototype)
    }
    serializeError() {
        return [{ message: 'Not Found' }]
    }
}
