import request from 'supertest'
import { app } from '../../app'

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    const response = await request(app)
        .post('/login')
        .send({
            email: 'test@nottest.com',
            password: 'password'
        })
        .expect(400)

    expect(response.body).toEqual({ errors: [ { message: 'Invalid credentials' } ] })
})

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    const response = await request(app)
        .post('/login')
        .send({
            email: 'test@test.com',
            password: 'password1'
        })
        .expect(400)

    expect(response.body).toEqual({ errors: [ { message: 'Invalid credentials' } ] })
})

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201)

    const response = await request(app)
        .post('/login')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
    expect(response.get('Set-Cookie').length).toBeGreaterThan(0)
    expect(response.body).toEqual({ message: 'Signed in' })

})



