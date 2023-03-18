import { ValidationError } from 'express-validator'
import { CustomError } from './CustomError'
export class CustomValidationError extends CustomError {
    errors: ValidationError[]
    statusCode: number;
    constructor(code: number, errors: ValidationError[]) {
        super()

        this.errors = errors
        this.statusCode = code

        Object.setPrototypeOf(this, CustomValidationError.prototype)
    }

    serializeError(): { message: string; param?: string }[] {
        return this.errors.map((error) => {
            return { message: error.msg, param: error.param }
        })
    }
}
