import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
    namespace Express {
        export interface Request {
            session: { jwt: string } | null;
            currentUser: { id: string; email: string } | null;
        }
    }
}

export const createSession = (req: Request, res: Response, next: NextFunction) => {
    req.session = { jwt: jwt.sign({ id: req.currentUser?.id, email: req.currentUser?.email }, process.env.JWT_KEY!) };
    next();
};
