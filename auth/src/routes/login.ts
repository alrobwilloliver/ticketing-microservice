import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { CustomValidationError } from '../errors/ValidationError'
import { User } from '../models/User'
import { BadRequestError } from '../errors/BadRequestError'

const route = express.Router()

export const login = route.post('/login',
    [
        body('email').isEmail().withMessage('Email must be valid'),
        body('password').trim().notEmpty().withMessage('You must supply a password')
    ],
    async (req: Request, res: Response) => {
        const { email, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new CustomValidationError(400, errors.array())
        }
        
        const user = await User.findOne({ email })

        if (!user) {
            throw new BadRequestError('Invalid credentials')
        }

        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials')
        }
        console.log('JWT_KEY', process.env.JWT_KEY)

        req.session = { jwt: jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!) }
        console.log(req.session.jwt)

        res.status(200).send({ message: 'Logged in' })
    }
)
