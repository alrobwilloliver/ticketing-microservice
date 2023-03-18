import { CustomError } from "./CustomError"

export class CustomDatabaseConnectionError extends CustomError {
    statusCode: number;
    message: string;
    constructor(code: number, message: string) {
        super()
        this.statusCode = code
        this.message = message
        Object.setPrototypeOf(this, CustomDatabaseConnectionError.prototype)
    }

    serializeError(): { message: string; param?: string }[] {
        return [{ message: this.message }]
    }
}
