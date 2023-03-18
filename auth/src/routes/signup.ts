import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { CustomValidationError } from '../errors/ValidationError'
import { User } from '../models/User'
import { BadRequestError } from '../errors/BadRequestError'
import jwt from 'jsonwebtoken'

const route = express.Router()

export const signup = route.post('/signup', 
    body('email').isEmail().withMessage('Email is in the incorrect format'),
    body('password').isLength({ min: 3, max: 20 }).withMessage('Password must be between 3-20 characters'),
    async (req: Request, res: Response) => {
    const { email, password } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new CustomValidationError(400, errors.array())
    }

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) {
            throw new BadRequestError('Email already in use')
        }

        const user = User.build({ email, password })
        await user.save()

        req.session = { jwt: jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!) }

        res.status(201).send({message: 'created new user', user })
    } catch (err: any) {
        throw new BadRequestError(err.message)
    }
})
