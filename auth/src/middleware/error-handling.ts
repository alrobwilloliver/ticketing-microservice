import { Request, Response, NextFunction } from "express"
import { CustomError } from "../errors/CustomError"

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeError() })
    }

    next()
}
