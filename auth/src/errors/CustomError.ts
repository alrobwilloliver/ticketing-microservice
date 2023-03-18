export abstract class CustomError {
    abstract statusCode: number;
    abstract serializeError(): { message: string, param?: string }[]
}
