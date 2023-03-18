import { CustomError } from './CustomError'

export class BadRequestError extends CustomError {
    statusCode = 400;
    constructor(public message: string) {
        super()
        this.message = message
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
    serializeError() {
        return [{ message: this.message }]
    }
}
