import express, { Request, Response } from 'express'

const route = express.Router()

export const logout = route.post('/logout', (req: Request, res: Response) => {
    req.session = null
    res.status(200).send({ message: 'Signed out' })
})
