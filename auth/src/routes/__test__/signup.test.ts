import { it } from '@jest/globals'

import request from 'supertest'
import { app } from '../../app'

it('returns a 201 on successful signup', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)
})

it('returns a 400 with an invalid email', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test',
            password: 'password'
        })
        .expect(400)
})

it('returns a 400 with an invalid password', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'p'
        })
        .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/signup')
        .send({})
        .expect(400)
})

it('disallows duplicate emails', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    const cookie = response.get('Set-Cookie')
    expect(cookie).toBeDefined()
    expect(cookie.length).toBeGreaterThan(0)
})
