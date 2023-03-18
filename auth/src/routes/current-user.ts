import express from 'express'
import jwt from 'jsonwebtoken'
import { NotAuthorizedError } from '../errors/NotAuthorizedError';

const router = express.Router()

declare global {
    namespace Express {
        interface Request {
            session: { jwt: string } | null;
            currentUser: { id: string; email: string } | null;
        }
    }
}

interface UserPayload {
    id: string;
    email: string;
}

export const currentUser = router.get('/current-user', (req, res) => {
    if (!req.session?.jwt) {
        throw new NotAuthorizedError()
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
        req.currentUser = payload
        res.status(200).send({ currentUser: payload })
    } catch (err) {}

    throw new NotAuthorizedError()
})
